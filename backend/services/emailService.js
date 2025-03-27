const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendVerificationEmail = async (email, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const verificationLink = `${process.env.BASE_URL}/verifyEmail?token=${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification",
            html: `
        <h3>Chào mừng bạn!</h3>
        <p>Hãy nhấp vào liên kết bên dưới để xác thực tài khoản của bạn:</p>
        <a href="${verificationLink}">Xác thực email</a>
        <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
      `,
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

exports.sendCodeForgetPassword = async (email, code) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification",
            html: `
        <h3>Chào mừng bạn!</h3>
        <p>Mã của bạn:</p>
        <p>${code}</p>
        <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
      `,
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendBill = async (email, data) => {
    const totalMoney = data.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
        0,
    );
    let html = `
    <h3 style="text-align: center; color: #1533f0;">Cảm ơn bạn đã mua hàng <3 </h3>
    <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
        <tr>
            <th style="border: 1px solid #000; padding: 8px 12px; text-align: center; background-color: #1533f0; color: #fff;">STT</th>
            <th style="border: 1px solid #000; padding: 8px 12px; text-align: center; background-color: #1533f0; color: #fff;">Tên sản phẩm</th>
            <th style="border: 1px solid #000; padding: 8px 12px; text-align: center; background-color: #1533f0; color: #fff;">Hình ảnh</th>
            <th style="border: 1px solid #000; padding: 8px 12px; text-align: center; background-color: #1533f0; color: #fff;">Giá</th>
            <th style="border: 1px solid #000; padding: 8px 12px; text-align: center; background-color: #1533f0; color: #fff;">Số lượng</th>
            <th style="border: 1px solid #000; padding: 8px 12px; text-align: center; background-color: #1533f0; color: #fff;">Tổng tiền</th>
        </tr>
        ${data.map((item, index) => {
        return `<tr>
                <td style="border: 1px solid #000; padding: 8px 12px; text-align: center;">${index + 1}</td>
                <td style="border: 1px solid #000; padding: 8px 12px;">
                    <p>${item.name}</p>
                    <p><b>Phân loại: </b>${item.color} / ${item.size}</p>
                </td>
                <td style="border: 1px solid #000; padding: 8px 12px; text-align: center;">
                    <img src="${item.images[0]}" style="width: 60px; height: auto; display: block; margin: 0 auto;">
                </td>
                <td style="border: 1px solid #000; padding: 8px 12px; text-align: center;">${item.price.toLocaleString('vi')} VNĐ</td>
                <td style="border: 1px solid #000; padding: 8px 12px; text-align: center;">${item.quantity}</td>
                <td style="border: 1px solid #000; padding: 8px 12px; text-align: center;">${(item.price * item.quantity).toLocaleString('vi')} VNĐ</td>
            </tr>`;
    }).join('')}
        <tr>
            <td colspan="5" style="border: 1px solid #000;background-color: #1533f0;color:white; text-align: center;padding: 8px 12px;"> Tổng tiền</td>
            <td style="border: 1px solid #000;background-color: #1533f0;color:white; padding: 8px 12px; text-align: center;">${totalMoney.toLocaleString('vi')} VNĐ</td>
        </tr>
    </table>`;

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Hóa đơn mua hàng",
            html: html,
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
