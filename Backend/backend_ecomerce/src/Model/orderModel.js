const { PrismaClient } = require('../generated/client')
const prisma = new PrismaClient()

const countOrders = async () => {
  return await prisma.order.count()
}

const createOrder = async (data) => {
  return await prisma.order.create({ data })
}

const createOrderItems = async (items) => {
  return await prisma.orderItem.createMany({ data: items })
}

const getOrderHistoryByUserId = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
    orderBy: { id: 'desc' },
    include: { orderItems: true }
  })
}

const updateProductStock = async (productId, quantity) => {
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) {
    throw new Error(`Sản phẩm không tồn tại (id=${productId})`)
  }
  if (product.stock < quantity) {
    throw new Error(`Không đủ stock cho sản phẩm ${product.name}`)
  }

  return await prisma.product.update({
    where: { id: productId },
    data: {
      stock: product.stock - quantity
    }
  })
}

module.exports = {
  countOrders,
  createOrder,
  createOrderItems,
  getOrderHistoryByUserId,
  updateProductStock
}
