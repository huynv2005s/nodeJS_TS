const Order = require('../models/order.model.js')
const payOS = require('../utils/payos.js')
const { sendBill } = require('../services/emailService.js')
exports.checkout = async (req, res) => {
    console.log(req.user)
    const { paymentMethod, address, phone, cart, totalPrice } = req.body
    try {
        let orderCode = Number(String(Date.now()).slice(-6)) * 100 + Math.floor(Math.random() * 100)
        let newOrder = await Order.create({
            userId: req.user._id,
            products: JSON.parse(cart),
            totalPrice,
            paymentMethod,
            paymentStatus: 'pending',
            info: {
                address,
                phone

            },
            status: 'pending',
            orderCode
        })
        await sendBill(req.user.email, JSON.parse(cart))
        if (paymentMethod === 'bank_transfer') {
            const data = {
                orderCode: orderCode,
                amount: 2000,
                description: "Thanh toán đơn hàng",
                cancelUrl: "http://127.0.0.1:5501/frontend/cancel.html",
                returnUrl: "http://127.0.0.1:5501/frontend/success.html"
            };
            const paymentLinkResponse = await payOS.createPaymentLink(data);
            // console.log(paymentLinkResponse.checkoutUrl)
            return res.status(200).json({ message: 'Bạn đã đặt hàng thành công', linkCheckout: paymentLinkResponse.checkoutUrl })
        }
        res.status(200).json({ message: 'Bạn đã đặt hàng thành công' })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
exports.getOrders = async (req, res) => {
    try {
        let orders = await Order.find({}).populate('userId', '-passwordHash').select('-__v').sort({ createdAt: -1 })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xãy ra' })
    }
}
exports.getOrderById = async (req, res) => {
    const { id } = req.params
    try {
        let orders = await Order.findOne({ _id: id }).populate('userId', '-passwordHash').select('-__v').sort({ createdAt: -1 })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xãy ra' })
    }
}
exports.setStatusOrder = async (req, res) => {
    const { id, status } = req.params
    try {
        let order = await Order.findOneAndUpdate({ _id: id }, { status }, { new: true })
        res.status(200).json({ message: `Đã thay đổi trạng thái đơn hàng thành ${status}`, order })
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xãy ra' })
    }
}
exports.callback = async (req, res) => {
    const { orderCode, status } = req.body;
    console.log(orderCode, status)
    await Order.findOneAndUpdate({ orderCode }, { paymentStatus: status, status }, { new: true });
    res.status(200).json({ message: "Đã cập nhật trạng thái thanh toán" });
};