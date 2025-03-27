var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Get, Post, Put, Delete } from '../fetch.js';
class Product {
    constructor() {
        this.getAllProducts = (...args_1) => __awaiter(this, [...args_1], void 0, function* (next = 0) {
            return yield Get(`getAllProduct?next=${next}`);
        });
        this.getOneProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield Get(`getOneProduct/${id}`);
        });
        this.getProductVariant = (id, size, color) => __awaiter(this, void 0, void 0, function* () {
            return yield Get(`getProductVariant/${id}/${size}/${color}`);
        });
        this.getProductByCategoryId = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield Get(`getProductByCategoryId/${id}`);
        });
        this.addProduct = (product) => __awaiter(this, void 0, void 0, function* () {
            return yield Post(`addProduct`, product);
        });
        this.updateProduct = (id, product) => __awaiter(this, void 0, void 0, function* () {
            return yield Put(`updateProduct/${id}`, product);
        });
        this.deleteProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield Delete(`deleteProduct/${id}`);
        });
    }
}
export default Product;
//# sourceMappingURL=product.js.map