const cartModel = require('../Model/cartModel')
const orderModel = require('../Model/orderModel')

const createOrder = async (req, res) => {
    try {
        const data = req.body
        const userId = Number(data.userId)
        const fullName = data.fullName
        const phone = data.phone
        const address = data.address
        const note = data.note || ''
        const id_country = Number(data.id_country)
        const shippingFee = Number(data.shippingFee || 0)
        const discountAmount = Number(data.discountAmount || 0)

        console.log('order request data', data)

        if (Number.isNaN(userId) || !fullName || !phone || !address || Number.isNaN(id_country)) {
            return res.status(400).json({ message: 'userId, fullName, phone, address, id_country là bắt buộc và phải hợp lệ' })
        }

        const bodyItems = Array.isArray(data.orderItems)
            ? data.orderItems
            : Array.isArray(data.cartItems)
                ? data.cartItems
                : []

        let orderItemsData = []
        let carts = []
        let usingCart = false

        if (bodyItems.length) {
            orderItemsData = bodyItems.map(item => {
                const productId = Number(item.productId)
                const price = Number(item.price ?? item.priceAtAdd ?? 0)
                const quantity = Number(item.quantity)
                const subtotal = !Number.isNaN(Number(item.subtotal))
                    ? Number(item.subtotal)
                    : price * quantity

                return {
                    productId,
                    productName: item.productName || item.name || '',
                    price,
                    quantity,
                    subtotal
                }
            })
        } else {
            carts = await cartModel.getCartByUserId(userId)
            console.log('carts', carts)

            if (carts.length) {
                for (const item of carts) {
                    if (!item.product) {
                        return res.status(400).json({ message: 'Sản phẩm trong giỏ hàng không tồn tại' })
                    }
                    if (item.product.stock < item.quantity) {
                        return res.status(400).json({ message: `Sản phẩm ${item.product.name} không đủ stock` })
                    }
                }

                usingCart = true
                orderItemsData = carts.map(item => {
                    const subtotal = item.totalAmount != null
                        ? item.totalAmount
                        : item.priceAtAdd * item.quantity

                    return {
                        productId: item.productId,
                        productName: item.product.name,
                        price: item.priceAtAdd,
                        quantity: item.quantity,
                        subtotal
                    }
                })
            }
        }

        if (!orderItemsData.length && Number.isNaN(Number(data.totalAmount))) {
            return res.status(400).json({ message: 'Giỏ hàng trống hoặc không có dữ liệu đơn hàng' })
        }

        const computedTotalAmount = orderItemsData.reduce((sum, item) => sum + item.subtotal, 0)
        const totalAmount = !Number.isNaN(Number(data.totalAmount))
            ? Number(data.totalAmount)
            : computedTotalAmount
        const finalAmount = !Number.isNaN(Number(data.finalAmount))
            ? Number(data.finalAmount)
            : totalAmount + shippingFee - discountAmount

        const order = await orderModel.createOrder({
            userId,
            totalAmount,
            shippingFee,
            discountAmount,
            finalAmount,
            fullName,
            phone,
            address,
            id_country,
            note
        })

        let orderItemsToCreate = []
        if (orderItemsData.length) {
            orderItemsToCreate = orderItemsData.map(item => ({
                ...item,
                orderId: order.id
            }))
            await orderModel.createOrderItems(orderItemsToCreate)
        }

        if (usingCart) {
            for (const item of carts) {
                await orderModel.updateProductStock(item.productId, item.quantity)
            }
            await cartModel.deleteCartByUserId(userId)
        }

        res.json({
            success: true,
            message: 'Tạo đơn hàng thành công',
            order,
            orderItems: orderItemsToCreate
        })
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo đơn hàng', error: error.message })
    }
}

const getOrderHistory = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
        if (Number.isNaN(userId)) {
            return res.status(400).json({ message: 'userId không hợp lệ' })
        }

        const orders = await orderModel.getOrderHistoryByUserId(userId)
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy lịch sử đơn hàng', error: error.message })
    }
}

module.exports = {
    createOrder,
    getOrderHistory
}
