const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (payload, expiresIn = '7d') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
const authMiddleware = (req, res, next) => {
    // console.log(req.headers)
    const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header (format: Bearer <token>)

    if (!token) {
        return res.status(401).json({ message: "Token không được cung cấp!" });
    }

    try {
        const decoded = verifyToken(token)
        req.user = decoded.user;
        // console.log(decoded);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token đã hết hạn!" });
        }
        return res.status(401).json({ message: "Token không hợp lệ!" });
    }
};

module.exports = {
    createToken,
    verifyToken,
    authMiddleware,
};
