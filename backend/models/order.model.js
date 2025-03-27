const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderCode: { type: Number, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            color: { type: String, required: true },
            price: { type: Number, required: true },
            size: { type: String, required: true },
            name: { type: String, required: true },
            images: [{ type: String, required: true }]
        }
    ],
    totalPrice: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: ['cod', 'momo', 'bank_transfer'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    info: {
        address: { type: String, required: true },
        phone: { type: String, required: true }
    },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled', 'paid'], default: 'pending' },
    linkCheckout: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
