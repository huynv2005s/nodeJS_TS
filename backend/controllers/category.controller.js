const Category = require('../models/category.model.js')


exports.addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        const data = await Category.create({
            categoryName
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
exports.getAllCategory = async (req, res) => {
    try {
        const data = await Category.find()
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
exports.editCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { categoryName } = req.body
        const data = await Category.findOneAndUpdate({ _id: id }, { categoryName }, { new: true })
        return res.status(200).json({ message: "Đã chỉnh sửa thành công", data })
    } catch (error) {
        console.log(error)
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Category.findByIdAndDelete({ _id: id })
        return res.status(200).json({ message: "Đã xóa thành công", data })
    } catch (error) {
        console.log(error)
    }
}