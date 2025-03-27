var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { IProduct } from "./type.js";
// import { get } from "jquery";
import Product from "./class/product.js";
export const addToCart = (id, size, color, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    let listCart = JSON.parse(localStorage.getItem('listCart')) || [];
    let product = new Product();
    let data = yield product.getProductVariant(id, size, color);
    let checkCart = listCart.filter((product) => product._id === data._id);
    if (checkCart.length > 0) {
        const index = listCart.findIndex((cart) => cart._id === checkCart[0]._id);
        console.log(checkCart);
        listCart[index].quantity += quantity;
    }
    else {
        data.quantity = quantity;
        listCart.push(data);
        console.log(listCart);
    }
    localStorage.setItem('listCart', JSON.stringify(listCart));
});
export const getCart = () => {
    let data = JSON.parse(localStorage.getItem('listCart')) || [];
    return data;
};
export const removeCart = (index) => {
    let data = getCart();
    let remove = data.splice(index, 1);
    localStorage.setItem('listCart', JSON.stringify(data));
};
export const updateCart = (index, quantity) => {
    let listCart = getCart();
    if (quantity > 0) {
        listCart[index].quantity = quantity;
    }
    else {
        listCart.splice(index, 1);
    }
    localStorage.setItem("listCart", JSON.stringify(listCart));
};
//# sourceMappingURL=handleCart.js.map