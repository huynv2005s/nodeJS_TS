// import { IProduct } from "./type.js";
// import { get } from "jquery";
import Product from "./class/product.js";
export const addToCart = async (id: string, size: string, color: string, quantity: number) => {
    let listCart = JSON.parse(localStorage.getItem('listCart')!) || [];
    let product = new Product();
    let data: any = await product.getProductVariant(id, size, color)
    let checkCart: any = listCart.filter((product: any) => product._id === data._id)
    if (checkCart.length > 0) {
        const index = listCart.findIndex((cart: any) => cart._id === checkCart[0]._id);
        console.log(checkCart)
        listCart[index].quantity += quantity
    } else {
        data.quantity = quantity
        listCart.push(data);
        console.log(listCart);
    }
    localStorage.setItem('listCart', JSON.stringify(listCart));
}
export const getCart = () => {
    let data: any = JSON.parse(localStorage.getItem('listCart')!) || []
    return data
}

export const removeCart = (index: number) => {
    let data: any = getCart()
    let remove = data.splice(index, 1)
    localStorage.setItem('listCart', JSON.stringify(data))
}
export const updateCart = (index: number, quantity: number) => {
    let listCart = getCart();
    if (quantity > 0) {
        listCart[index].quantity = quantity;
    } else {
        listCart.splice(index, 1);
    }
    localStorage.setItem("listCart", JSON.stringify(listCart));
}