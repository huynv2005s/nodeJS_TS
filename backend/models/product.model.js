const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    images: { type: [String] },
    tags: [{ type: String, required: true }],
    variants: [
        {
            color: { type: String, required: true },
            size: { type: String, required: true },
            stock: { type: Number, required: true },
            price: { type: Number }
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
