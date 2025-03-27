import { Get, Post, Put, Delete } from '../fetch.js'
import { IProduct } from "../type.js";
class Product {
    getAllProducts = async (next: number = 0): Promise<IProduct[]> => {
        return await Get(`getAllProduct?next=${next}`)
    }
    getOneProduct = async (id: string): Promise<IProduct> => {
        return await Get(`getOneProduct/${id}`)
    }
    getProductVariant = async (id: string, size: string, color: string): Promise<IProduct> => {
        return await Get(`getProductVariant/${id}/${size}/${color}`)
    }
    getProductByCategoryId = async (id: string): Promise<IProduct[]> => {
        return await Get(`getProductByCategoryId/${id}`)
    }
    addProduct = async (product: any) => {
        return await Post(`addProduct`, product)
    }
    updateProduct = async (id: string, product: any) => {
        return await Put(`updateProduct/${id}`, product)
    }
    deleteProduct = async (id: string) => {
        return await Delete(`deleteProduct/${id}`)
    }
}
export default Product