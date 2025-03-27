const Product = require('../models/product.model.js')
// exports.addProduct = async (req, res) => {
//     const { name, brand, description, image, sizes, stock, category } = req.body

// }
exports.getAllProduct = async (req, res) => {
    try {
        const next = req.query.next || 0
        const data = await Product.find().limit(8 + (next * 4)).sort({ createdAt: -1 })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
exports.getOneProduct = async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id)
        const data = await Product.findOne({ _id: id }).populate("categoryId")
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, tags, variants, categoryId } = req.body
        console.log(req.files)
        const images = req.files.map(file => file.path)
        const productNew = await Product.create({
            name,
            description,
            price,
            categoryId,
            images,
            tags,
            variants,
        })
        // let data = { name, description, price, tags, variants, categoryId }
        console.log(productNew)
        res.status(200).json({ message: "Thêm sản phẩm thành công", data: productNew })
    } catch (error) {
        res.status(500).json({ message: "Đã có lỗi xảy ra" })
    }
}
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, tags, variants, categoryId } = req.body;
        let images = req.files && req.files.length > 0 ? req.files.map(file => file.path) : [];
        const product = await Product.findOne({ _id: id });
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }
        if (images.length === 0) {
            images = product.images;
        }
        const productNew = await Product.findOneAndUpdate(
            { _id: id },
            {
                name,
                description,
                price,
                categoryId,
                images,
                tags,
                variants,
            },
            { new: true }
        );
        res.status(200).json({ message: "Cập nhật sản phẩm thành công", data: productNew });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Đã có lỗi xảy ra", error: error.message });
    }

}
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }
        await Product.deleteOne({ _id: id });
        res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Đã có lỗi xảy ra", error: error.message });
    }
};

exports.getProductByCategoryId = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Product.find({ categoryId: id })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
exports.getProductVariant = async (req, res) => {
    try {
        const { id, size, color } = req.params;
        const data = await Product.findOne({
            "_id": id,
            "variants.color": color,
            "variants.size": size
        });
        if (!data) {
            return res.status(404).json({ message: "Product not found" });
        }
        const index = data.variants.findIndex(
            (item) => item.size === size && item.color === color
        );
        if (index === -1) {
            return res.status(404).json({ message: "Variant not found" });
        }
        let result = {
            ...data.variants[index]._doc,
            images: data.images,
            name: data.name
        };

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.updatePrice = async (req, res) => {
    try {
        // Lấy tất cả sản phẩm từ database
        let products = await Product.find({});

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm nào!" });
        }

        // Tạo danh sách update để bulkWrite
        let bulkUpdates = products.map(product => {
            if (product.variants && product.variants.length > 0) {
                let updatedVariants = product.variants.map(variant => ({
                    ...variant.toObject(),  // Convert Mongoose Document -> Object
                    price: product.price
                }));

                return {
                    updateOne: {
                        filter: { _id: product._id },
                        update: { $set: { variants: updatedVariants } }
                    }
                };
            }
            return null;
        }).filter(update => update !== null); // Lọc bỏ các sản phẩm không có variants

        // Nếu có sản phẩm cần cập nhật, thực hiện bulkWrite
        if (bulkUpdates.length > 0) {
            let result = await Product.bulkWrite(bulkUpdates);
            return res.status(200).json({ message: "Cập nhật giá variant thành công!", result });
        } else {
            return res.status(400).json({ message: "Không có sản phẩm nào có variants để cập nhật!" });
        }

    } catch (error) {
        console.error("Lỗi khi cập nhật giá:", error);
        return res.status(500).json({ error: "Lỗi server" });
    }
};
