declare var Swal: any;
declare var bootstrap: any;
declare var DataTable: any;
// import DataTable from 'datatables.net-dt';
// let table = new DataTable('#tableProduct');
import Product from '../class/product.js';
import Category from '../class/category.js';
import { IProduct } from '../type.js';
let category = new Category()
let product = new Product()

const message = (message: string, status: string = 'success') => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast: any) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: status,
        title: message
    });
}
let myModalEl = document.getElementById('exampleModal')!;
let modal = new bootstrap.Modal(myModalEl);

const showLoading = () => {
    modal.hide();
    document.getElementById('loadingSpinner')!.style.display = 'flex';
}

const hideLoading = () => {
    document.getElementById('loadingSpinner')!.style.display = 'none';
}

const loadProducts = async () => {


    showLoading()
    try {
        const products = await product.getAllProducts(999);
        renderProducts(products);
        updateProduct()
        addProduct()
        deleteProduct()
    } catch (error) {
        console.error(error);
    } finally {
        hideLoading();
    }
}
const handleShowModal = async (product: any = null) => {
    let name = document.getElementById('name')! as HTMLInputElement;
    let price = document.getElementById('price')! as HTMLInputElement;
    let description = document.getElementById('description')! as HTMLInputElement;
    let categoryId = document.getElementById('categoryId')! as HTMLSelectElement;
    let btnSubmit = document.getElementById('btnSubmit')! as HTMLButtonElement;

    modal.hide()
    let html = '';
    let catId = product ? product.categoryId._id : '';
    let categories = await category.getCategoryAll();

    categories.forEach(category => {
        html += `<option value="${category._id}" ${category._id == catId ? 'selected' : ''}>${category.categoryName}</option>`;
    });

    categoryId.innerHTML = html;

    if (product) {
        name.value = product.name;
        price.value = String(product.price);
        description.value = product.description;
        btnSubmit.innerText = "Lưu chỉnh sửa"
    } else {
        name.value = '';
        price.value = '';
        description.value = '';
    }

    handleSubmit(product ? product._id : null);
    // modal.show()
};

const updateProduct = () => {
    document.querySelectorAll('.updateProduct')!.forEach(item => {
        item.addEventListener("click", async () => {
            let id = String(item.getAttribute('data-id'))
            let productUpdate: IProduct = await product.getOneProduct(id)
            handleShowModal(productUpdate)
            // handleSubmit()
            // console.log(productUpdate)
        })
    })

}
const addProduct = () => {
    document.querySelector('#addProduct')!.addEventListener("click", async () => {
        handleShowModal()
    })
}

const renderProducts = (arr: IProduct[]) => {
    let html = '';
    arr.forEach((product: IProduct, index: number) => {
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
        `
    })
    document.getElementById('table-products')!.innerHTML = html
    let table = new DataTable('#tableProduct');
}
const handleSubmit = (currentProductId: string | null = null) => {
    const form = document.querySelector("#productForm")! as HTMLFormElement;

    const newForm = form.cloneNode(true) as HTMLFormElement;
    form.replaceWith(newForm);

    newForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();

        const formData = new FormData(newForm);
        try {
            let response;
            if (currentProductId) {
                response = await product.updateProduct(currentProductId, formData);
            } else {
                response = await product.addProduct(formData);
            }
            message(response.message, response.status !== 200 ? "success" : "error");

        } catch (error) {
            message("Đã có lỗi xảy ra, vui lòng thử lại!", "error");
        }
        form.reset();
        await loadProducts();
        hideLoading();
    });
};

const deleteProduct = () => {
    document.querySelectorAll('.deleteProduct')!.forEach((item) => {
        item.addEventListener('click', async () => {
            let id = item.getAttribute('data-id');
            const result = await Swal.fire({
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
                    let response = await product.deleteProduct(String(id));
                    message(response.message, response.status !== 200 ? "success" : "error");
                    await loadProducts();
                } catch (error) {
                    message("Đã có lỗi xảy ra, vui lòng thử lại!", "error");
                }
            }
        });
    });
};

loadProducts()
