var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Product from "./class/product.js";
import { addToCart } from './handleCart.js';
export const showBoxDetail = () => {
    const jsShowModal1 = document.querySelectorAll(".js-show-modal1");
    const jsHideModal1 = document.querySelector(".js-hide-modal1");
    const modal1 = document.querySelector(".js-modal1");
    const name = document.querySelector(".js-name-detail");
    const price = document.querySelector(".price-detail");
    const des = document.querySelector(".description-detail");
    const image = document.querySelector("#list-image");
    const btn = document.getElementById("addCart");
    const color = document.getElementById("color");
    const size = document.getElementById("size");
    const quantity = document.getElementById("quantity");
    // console.log("dsds")
    // console.log(image);
    jsShowModal1.forEach((item) => {
        item.addEventListener("click", function (e) {
            return __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                let id = item.getAttribute("data-id");
                let product = new Product();
                btn.setAttribute("data-productId", String(id));
                let data = yield product.getOneProduct(String(id));
                console.log(data);
                name.innerHTML = data.name;
                price.innerHTML = data.price.toLocaleString('vi') + " VNĐ";
                des.innerHTML = data.description;
                let html = `
                    <div class="item-slick3" data-thumb="${data.images[0]}">
                        <div class="wrap-pic-w pos-relative">
                            <img src="${data.images[0]}" alt="IMG-PRODUCT">
                            <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                href="${data.images[0]}">
                                <i class="fa fa-expand"></i>
                            </a>
                        </div>
                    </div>
                `;
                image.innerHTML = html;
                modal1.classList.add("show-modal1");
                btn.addEventListener("click", () => {
                    let productId = btn.getAttribute("data-productID");
                    console.log(productId);
                    addToCart(String(productId), size.value, color.value, Number(quantity.value));
                });
            });
        });
    });
    jsHideModal1.addEventListener("click", function () {
        modal1.classList.remove("show-modal1");
    });
};
//# sourceMappingURL=boxModel.js.map