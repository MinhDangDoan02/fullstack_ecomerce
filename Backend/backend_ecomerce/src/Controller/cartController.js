const cartModel = require('../Model/cartModel')

const createCart = async (req, res) => {
    const data = req.body
    const userId = parseInt(data.userId)
    const productId = parseInt(data.productId)
    const quantity = parseInt(data.quantity)
    const priceAtAdd = parseFloat(data.priceAtAdd)
    const cartData = {
        userId,
        productId,
        quantity,
        priceAtAdd,  
    }
    const cart = await cartModel.createCart(cartData)
    res.json(cart)
   

}
  

const getCartByUserId = async (req, res) => {
    const userId = parseInt(req.params.userId)
    const cart = await cartModel.getCartByUserId(userId)
    res.json(cart)
}
const updateCart = async (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body   
    const cart = await cartModel.updateCartItem(id, data)
    res.json(cart)
}
const deleteCart = async (req, res) => {
    const id = parseInt(req.params.id)
    await cartModel.deleteCartItem(id)
    res.json({message:'xoa thanh cong'})
}

module.exports = {
    createCart,
    getCartByUserId,
    updateCart,
    deleteCart
}