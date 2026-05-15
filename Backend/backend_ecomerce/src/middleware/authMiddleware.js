const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

const SECRET_KEY = 'minh - dang'; // ⚠️ TODO: Nên để trong file .env để bảo mật

/**
 * Hàm tạo JWT Token
 * - Được gọi khi user đăng nhập thành công
 * - Token có hiệu lực 5 giờ
 */
const createJWT = (payload) => {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5h' });
    return token;
};

/**
 * Middleware xác thực Token
 * - Kiểm tra token từ header "Authorization: Bearer <token>"
 * - Nếu token hợp lệ, lấy thông tin user hiện tại từ database
 * - Nếu token không hợp lệ hoặc user không tồn tại, trả về lỗi
 */
const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

        if (!user) {
            return res.status(401).json({ message: "Người dùng không tồn tại hoặc đã bị xóa." });
        }

        // Lưu thông tin user hiện tại từ database
        req.user = {
            userId: user.id,
            username: user.name,
            level: user.level
        };

        next();
    } catch (err) {
        return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
    }
};

/**
 * Middleware kiểm tra quyền Admin
 * - Chỉ cho phép user có level = 1 (admin) vào
 * - Nếu user bình thường (level = 0) sẽ trả về lỗi 403
 */
const isAdmin = (req, res, next) => {
    if (req.user && req.user.level === 1) {
        next();
    } else {
        res.status(403).json({ message: "Chỉ Admin mới có quyền thực hiện hành động này!" });
    }
};

module.exports = { createJWT, verifyToken, isAdmin };