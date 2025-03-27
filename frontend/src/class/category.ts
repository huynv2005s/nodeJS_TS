import { Get } from '../fetch.js'
import { ICategory } from "../type.js";
class Category {
    getCategoryAll = async (): Promise<ICategory[]> => {
        let category = await Get('getAllCategory')
        return category
    }
    // addCategory = async (): Promise<ICategory> => {
    //     return Post('addCategory',)
    // }
}
export default Category