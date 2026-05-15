const productModel = require('../Model/productModel')
const multer = require('multer')
const path = require('path')
const productVadication = require('../vadication/productVadication')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload/product')
    },
    filename : (req, file, cb) => {
        const nameImageBlog = Date.now() + '-' + Math.round(Math.random()* 1e9)
        cb(null, nameImageBlog + path.extname(file.originalname))
    }

})
const upload = multer({storage}).array('image', 3)

const createProduct = async (req , res) => {
    const data = req.body
    const file = req.files
    data.price = parseFloat(data.price)
    data.id_category = parseInt(data.id_category)
    data.stock = parseInt(data.stock)
    if (data.id_user) data.id_user = parseInt(data.id_user)

    const errors = productVadication(data, file)
    if(Object.keys(errors).length > 0){
        res.status(400).json(errors)
    }
    data.image = file? file.map(file =>  file.filename) : []
    data.image = JSON.stringify(data.image)
    const product = await productModel.createProduct(data)
    res.json(product)
}

const getProduct = async (req, res) => {
    // If request is from admin (middleware set req.user), include deleted products
    const includeDeleted = req.user && req.user.level === 1
    const product = await productModel.getProduct(includeDeleted)
    res.json(product)
}


const restoreProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await productModel.restoreProduct(id)
    res.json({ message: 'khôi phục thành công', data: product })
}

const forceDeleteProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    await productModel.forceDeleteProduct(id)
    res.json({ message: 'xóa vĩnh viễn thành công' })
}
const getProductWishlist = async (req, res) => {
    const wishlist = await productModel.getProductWishlist()
    res.json({ data: wishlist })
}

const createProductWishlist = async (req, res) => {
    const { userId, productId } = req.body
    const product = await productModel.createProductWishlist({ userId: parseInt(userId), productId: parseInt(productId) })
    res.json(product)
}
const getProductWishlistById = async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await productModel.getProductWishlistById(id)
    if (product) {
        res.json(product)
    }
        else {
        res.status(404).json({ message: 'Sản phẩm không tồn tại' })
    }   
}

const getProductById = async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await productModel.getProductById(id)
    if (product) {
        // If product is soft-deleted, only allow admins to view it
        if (product.isDeleted && !(req.user && req.user.level === 1)) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' })
        }
        res.json(product)
    } else {
        res.status(404).json({ message: 'Sản phẩm không tồn tại' })
    }
}
const updateProduct = async (req , res) => {
    const data = req.body
    const id = parseInt(req.params.id)
    const product = await productModel.updateProduct(id, data)
    res.json(product)
}
const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id)
   await productModel.deleteProduct(id)
    res.json({message:'xoa thanh cong'})
}

const searchProductByName = async (req, res) => {
    const { name } = req.query
    if (!name) {
        return res.status(400).json({ message: 'Vui lòng nhập tên sản phẩm để tìm kiếm' })
    }
    const products = await productModel.searchProductByName(name)
    res.json(products)
}

module.exports = {
    createProduct,
    getProduct,
    getProductWishlist,
    createProductWishlist,
    getProductWishlistById,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProductByName,
    upload
    ,
    restoreProduct,
    forceDeleteProduct
}