const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController')
const blogController = require('../Controller/blogController')
const countryController = require('../Controller/countryController')
const productController = require('../Controller/producController')
const categoryController = require('../Controller/categoryController')
const {verifyToken, isAdmin} = require('../middleware/authMiddleware')
const cartController = require('../Controller/cartController')
const orderController = require('../Controller/orderController')

// ============= USER ROUTES =============
// Đăng ký: Tất cả người có thể đăng ký
router.post('/admin/user/register',userController.upload, userController.createUser)

// Đăng nhập: Tất cả người có thể đăng nhập
router.post('/admin/user/login', userController.loginUser)

// Lấy danh sách user: Chỉ Admin
router.get('/admin/user/list',verifyToken,isAdmin, userController.getUser)

// Lấy thông tin user theo ID: Bất kỳ người dùng nào cũng có thể xem
router.get('/admin/user/show/:id',verifyToken, userController.getUserById)

// Cập nhật user:
// - User bình thường: chỉ cập nhật riêng mình, không thể update level
// - Admin: cập nhật bất kỳ ai, bao gồm cả level
router.post('/admin/user/update/:id',verifyToken,userController.upload, userController.updateUser)

// Xóa user: Chỉ Admin
router.post('/admin/user/delete/:id',verifyToken,isAdmin, userController.deleteUser)

// ============= BLOG ROUTES =============
router.post('/admin/blog/add',verifyToken,isAdmin,blogController.upload, blogController.createBlog)
router.post('/admin/blog/update/:id',verifyToken,isAdmin,blogController.upload, blogController.updateBlog)
router.post('/admin/blog/delete/:id',verifyToken,isAdmin, blogController.deleteBlog)
router.get('/admin/blog/list',verifyToken,isAdmin,blogController.getBlog)
router.get('/admin/blog/detail/:id',verifyToken,isAdmin, blogController.getBlogById)

// ============= COUNTRY ROUTES =============
router.post('/admin/country/add',countryController.createCountry)
router.post('/admin/country/update/:id',verifyToken,isAdmin,countryController.updateCountry)
router.post('/admin/country/delete/:id',verifyToken,isAdmin,countryController.deleteCountry)
router.get('/admin/country/list', countryController.getCountry)

// ============= CATEGORY ROUTES =============
router.post('/admin/category/add', categoryController.createCategory)
router.get('/admin/category/list', categoryController.getCategory)
router.post('/admin/category/update/:id',verifyToken,isAdmin, categoryController.updateCategory)
router.post('/admin/category/delete/:id',verifyToken,isAdmin, categoryController.deleteCategory)

// ============= PRODUCT ROUTES =============
router.get('/admin/product/list', productController.getProduct)
router.get('/admin/product/detail/:id',verifyToken,isAdmin, productController.getProductById)
router.post('/admin/product/edit/:id',verifyToken,isAdmin,productController.upload, productController.updateProduct)
router.post('/admin/product/delete/:id',verifyToken,isAdmin, productController.deleteProduct)
router.delete('/admin/product/delete/:id',verifyToken,isAdmin, productController.deleteProduct)
router.post('/admin/product/restore/:id',verifyToken,isAdmin, productController.restoreProduct)
router.delete('/admin/product/force-delete/:id',verifyToken,isAdmin, productController.forceDeleteProduct)
router.post('/admin/product/add',productController.upload, productController.createProduct)

router.post('/cart/add', cartController.createCart)
router.get('/cart/:userId', cartController.getCartByUserId)
router.post('/cart/update/:id', cartController.updateCart)
router.post('/cart/delete/:id', cartController.deleteCart)

router.post('/order/create', orderController.createOrder)
router.get('/order/history/:userId', orderController.getOrderHistory)


// MEMBER ROUTES
// ============= USER ROUTES =============
// Đăng ký: Tất cả người có thể đăng ký
router.post('/member/register',userController.upload, userController.createUser)

// Đăng nhập: Tất cả người có thể đăng nhập
router.post('/member/login', userController.loginUser)



// Lấy thông tin user theo ID: Bất kỳ người dùng nào cũng có thể xem
router.get('/member/show/:id',verifyToken, userController.getUserById)

// Cập nhật user:
// - User bình thường: chỉ cập nhật riêng mình, không thể update level
// - Admin: cập nhật bất kỳ ai, bao gồm cả level
router.post('/member/update/:id',verifyToken,userController.upload, userController.updateUser)


// ============= BLOG ROUTES =============
router.get('/blog/list',blogController.getBlog)
router.get('/blog/detail/:id', blogController.getBlogById)
router.get('/blog/search', blogController.searchBlogByName)
router.post('/blog/comment/:id', verifyToken, blogController.commentParser, blogController.createBlogComment)
router.get('/blog/comments/:id', blogController.getBlogComments)
router.get('/blog/rate/:id', blogController.getBlogRate)
router.post('/blog/rate/:id', verifyToken, blogController.rateParser, blogController.createBlogRate)

// ============= COUNTRY ROUTES =============
router.get('/country/list', countryController.getCountry)

// ============= CATEGORY ROUTES =============
router.get('/category/list', categoryController.getCategory)

// ============= PRODUCT ROUTES =============
router.get('/product/wishlist', productController.getProductWishlist)
router.get('/product/wishlist/:id', productController.getProductWishlistById)
router.post('/product/wishlist/add', productController.createProductWishlist)
router.get('/product/search', productController.searchProductByName)
router.get('/product/list', productController.getProduct)
router.get('/product/detail/:id', productController.getProductById)
router.post('/product/edit/:id',verifyToken,productController.upload, productController.updateProduct)
router.post('/product/delete/:id',verifyToken, productController.deleteProduct)
router.post('/product/add',verifyToken,productController.upload, productController.createProduct)


module.exports = router
