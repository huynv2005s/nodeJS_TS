var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import DataTable from 'datatables.net-dt';
// let table = new DataTable('#tableProduct');
import Product from '../class/product.js';
import Category from '../class/category.js';
let category = new Category();
let product = new Product();
const message = (message, status = 'success') => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: status,
        title: message
    });
};
let myModalEl = document.getElementById('exampleModal');
let modal = new bootstrap.Modal(myModalEl);
const showLoading = () => {
    modal.hide();
    document.getElementById('loadingSpinner').style.display = 'flex';
};
const hideLoading = () => {
    document.getElementById('loadingSpinner').style.display = 'none';
};
const loadProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    showLoading();
    try {
        const products = yield product.getAllProducts(999);
        renderProducts(products);
        updateProduct();
        addProduct();
        deleteProduct();
    }
    catch (error) {
        console.error(error);
    }
    finally {
        hideLoading();
    }
});
const handleShowModal = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (product = null) {
    let name = document.getElementById('name');
    let price = document.getElementById('price');
    let description = document.getElementById('description');
    let categoryId = document.getElementById('categoryId');
    let btnSubmit = document.getElementById('btnSubmit');
    modal.hide();
    let html = '';
    let catId = product ? product.categoryId._id : '';
    let categories = yield category.getCategoryAll();
    categories.forEach(category => {
        html += `<option value="${category._id}" ${category._id == catId ? 'selected' : ''}>${category.categoryName}</option>`;
    });
    categoryId.innerHTML = html;
    if (product) {
        name.value = product.name;
        price.value = String(product.price);
        description.value = product.description;
        btnSubmit.innerText = "Lưu chỉnh sửa";
    }
    else {
        name.value = '';
        price.value = '';
        description.value = '';
    }
    handleSubmit(product ? product._id : null);
    // modal.show()
});
const updateProduct = () => {
    document.querySelectorAll('.updateProduct').forEach(item => {
        item.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            let id = String(item.getAttribute('data-id'));
            let productUpdate = yield product.getOneProduct(id);
            handleShowModal(productUpdate);
            // handleSubmit()
            // console.log(productUpdate)
        }));
    });
};
const addProduct = () => {
    document.querySelector('#addProduct').addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        handleShowModal();
    }));
};
const renderProducts = (arr) => {
    let html = '';
    arr.forEach((product, index) => {
        html += `
               <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td><img width="70px" src="${product.images[0]}" alt="Product Image"/></td>
                    <td>
                        <div class="group-btn">
                            <button data-id="${product._id}" class="btn btn-primary updateProduct" data-bs-toggle="modal" data-bs-target="#exampleModal">Sửa</button>
                            <button data-id="${product._id}" class="btn btn-danger deleteProduct">Xóa</button>
                        </div>
                    </td> 
                </tr>
        `;
    });
    document.getElementById('table-products').innerHTML = html;
    let table = new DataTable('#tableProduct');
};
const handleSubmit = (currentProductId = null) => {
    const form = document.querySelector("#productForm");
    const newForm = form.cloneNode(true);
    form.replaceWith(newForm);
    newForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        showLoading();
        const formData = new FormData(newForm);
        try {
            let response;
            if (currentProductId) {
                response = yield product.updateProduct(currentProductId, formData);
            }
            else {
                response = yield product.addProduct(formData);
            }
            message(response.message, response.status !== 200 ? "success" : "error");
        }
        catch (error) {
            message("Đã có lỗi xảy ra, vui lòng thử lại!", "error");
        }
        form.reset();
        yield loadProducts();
        hideLoading();
    }));
};
const deleteProduct = () => {
    document.querySelectorAll('.deleteProduct').forEach((item) => {
        item.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            let id = item.getAttribute('data-id');
            const result = yield Swal.fire({
                title: "Bạn có chắc chắn muốn xóa?",
                text: "Hành động này không thể hoàn tác!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Xóa ngay",
                cancelButtonText: "Hủy"
            });
            if (result.isConfirmed) {
                try {
                    let response = yield product.deleteProduct(String(id));
                    message(response.message, response.status !== 200 ? "success" : "error");
                    yield loadProducts();
                }
                catch (error) {
                    message("Đã có lỗi xảy ra, vui lòng thử lại!", "error");
                }
            }
        }));
    });
};
loadProducts();
//# sourceMappingURL=product.js.map