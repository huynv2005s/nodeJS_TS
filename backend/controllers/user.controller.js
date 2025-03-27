const User = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
const { verifyToken, createToken } = require('../middlewares/jwt.middleware.js')
const { sendVerificationEmail, sendCodeForgetPassword } = require('../services/emailService.js')
exports.registerUser = async (req, res) => {
    try {
        const { fullName, email, passwordHash } = req.body
        // console.log(req.body)
        let existEmail = await User.find({ email })
        if (existEmail.length > 0) {
            return res.status(403).json({ message: 'Email này đã được đăng ký' })
        }
        const newUser = await User.create({
            fullName,
            email,
            passwordHash
        })
        // console.log(newUser)
        await sendVerificationEmail(email, newUser._id);
        return res.status(200).json({ message: "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Đăng ký thất bại!" });
    }

}

exports.verifyEmail = async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({ message: "Token không hợp lệ!" });
    }
    try {
        const decoded = verifyToken(token)
        await User.findByIdAndUpdate(decoded.userId, { isVerified: true });
        res.status(200).send("Email của bạn đã được xác thực thành công!");
    } catch (error) {
        console.error(error);
        res.status(400).send("Liên kết xác thực không hợp lệ hoặc đã hết hạn!");
    }
}
exports.verifyCode = async (req, res) => {
    const decoded = req.user;
    console.log(decoded);
    const { email, code } = req.body
    try {
        if (decoded.email == email && decoded.code == code) {
            return res.status(200).json({ message: "Mã hợp lệ vui nhập mật khẩu mới" });
        }
        res.status(400).json({ message: "Mã không đúng" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Đã có lỗi xảy ra vui lòng thao tác lại");
    }
}
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "Tài khoản này không tồn tại" });
        }
        const code = generateCode()
        let token = createToken({ email, code }, '1h')
        await sendCodeForgetPassword(email, code);
        res.status(200).json({ message: "Mã đã được gửi về email của bạn", token });
    } catch (error) {
        console.error(error);
        res.status(400).send("Liên kết xác thực không hợp lệ hoặc đã hết hạn!");
    }
}
exports.updatePassword = async (req, res) => {
    const { email, passwordNew } = req.body;
    try {
        await User.findOneAndUpdate({ email }, { passwordHash: passwordNew })
        res.status(200).json({ message: "Mật khẩu mới đã được áp dụng" })
    } catch (error) {
        res.status(500).json({ message: "Đã có lỗi xãy ra" })
    }
}
exports.login = async (req, res) => {
    const { email, passwordHash } = req.body;
    try {
        let user = await User.findOne({ email, passwordHash }).select('-passwordHash');
        // console.log(user)
        if (!user) {
            return res.status(404).json({ message: "Tài khoản hoặc mật khẩu không đúng" })
        }
        let token = createToken({ user })
        res.cookie('userLogin', token)
        res.status(200).json({ message: "Đăng nhập thành công", user: user, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Đã có lỗi xãy ra" })
    }
}
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
}
function checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}
function hashPassword(plainPassword) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(plainPassword, salt);
    return hashedPassword;
}