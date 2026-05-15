const userModel = require('../Model/userModel')
const userVadication = require('../vadication/userVadication')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcryptjs')
const {createJWT} = require('../middleware/authMiddleware')

// ============= MULTER CONFIGURATION =============
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload/user')
    },
    filename: (req, file, cb) => {
        const nameFile = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, nameFile + path.extname(file.originalname))
    }
})
const upload = multer({storage}).single('avatar')

// ============= USER CONTROLLER FUNCTIONS =============

/**
 * Hàm tạo user mới (Đăng ký)
 * - Luôn ép level = 0 (user bình thường), tránh user tự set làm admin
 * - Mã hóa password trước khi lưu
 * - Kiểm tra email không được trùng
 */
const createUser = async(req, res) => {
    const data = req.body

    data.level = 0

    data.id_country = parseInt(data.id_country)
    const file = req.file

    // Kiểm tra dữ liệu đầu vào
    const errors = userVadication(data, file)
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }

    // Kiểm tra email không trùng
    const errorsMail = await userModel.checkEmailUser(data.email)
    if (Object.keys(errorsMail).length > 0) {
        return res.status(400).json(errorsMail)
    }

    // Xử lý avatar
    data.avatar = file ? file.filename : ''

    // Mã hóa password
    data.password = await bcrypt.hash(data.password, 10)

    const user = await userModel.createUser(data)
    res.json(user)
}

/**
 * Hàm đăng nhập
 * - Kiểm tra email & password
 * - Nếu level = 1: đăng nhập admin
 * - Nếu level = 0: đăng nhập member
 * - Tạo JWT token chứa userId, username, level
 * - Token có hiệu lực 5 giờ
 */
const loginUser = async (req, res) => {
    const data = req.body
    const checkLogin = await userModel.checkLogin(data)

    if (!checkLogin) {
        return res.status(400).json({ message: 'Email hoặc password không chính xác' })
    }

    // Cho phép cả admin (level=1) và member (level=0) đăng nhập
    const token = createJWT({
        userId: checkLogin.id,
        username: checkLogin.name,
        level: checkLogin.level
    })

    const role = checkLogin.level === 1 ? 'admin' : 'member'

    res.json({
        message: `Đăng nhập thành công với tư cách ${role}`,
        token,
        user: checkLogin,
        role
    })
}

/**
 * Hàm lấy danh sách tất cả user
 * - Chỉ admin có thể gọi
 */
const getUser = async (req, res) => {
    const user = await userModel.getUser()
    res.json(user)
}

/**
 * Hàm lấy thông tin user theo ID
 */
const getUserById = async (req, res) => {
    const id = parseInt(req.params.id)
    const user = await userModel.getUserById(id)

    if (user) {
        res.json(user)
    } else {
        res.status(400).json({ message: 'Người dùng không tồn tại' })
    }
}

/**
 * Hàm cập nhật thông tin user
 * - User bình thường: chỉ update chính mình, không update level
 * - Admin: update bất kỳ user nào, có thể update level
 */
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id)
    const file = req.file
    const data = req.body
    const userId = req.user.userId
    const userLevel = req.user.level

    if (userLevel !== 1 && userId !== id) {
        return res.status(403).json({ message: 'Bạn chỉ có thể cập nhật thông tin của chính mình!' })
    }

    if (userLevel !== 1) {
        delete data.level
    }

    // Nếu admin cập nhật level, convert giá trị string sang int để Prisma không lỗi
    if (data.level !== undefined) {
        data.level = parseInt(data.level)
    }
    if (data.id_country) {
        data.id_country = parseInt(data.id_country)
    }
    if (file) {
        data.avatar = file.filename
    }
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10)
    }

    const user = await userModel.updateUser(id, data)
    res.json(user)
}

/**
 * Hàm xóa user
 * - Chỉ admin có thể gọi
 */
const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id)
    await userModel.deleteUser(id)
    res.json({ message: 'Xóa người dùng thành công' })
}

/**
 * Hàm lấy danh sách sản phẩm của user theo tên
 * - Chỉ admin có thể gọi
 */
const getProductByUser = async (req, res) => {
    const name = req.params.name
    const user = await userModel.getProductByUser(name)
    res.json(user)
}

module.exports = {
    createUser,
    upload,
    loginUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    getProductByUser
}