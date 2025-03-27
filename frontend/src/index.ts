import Product from "./class/product.js";
import Category from "./class/category.js";
import { IProduct, ICategory } from "./type.js";
import { showBoxDetail } from "./boxModel.js";
let product = new Product();
let category = new Category()

const listProduct = document.getElementById("list-product")!;
const renderProduct = (data: IProduct[]) => {
    listProduct.innerHTML = "";

    let productHTML: string = "";
    data.forEach((product: IProduct) => {
        productHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 ">
                <!-- Block2 -->
                <div class="block2">
                    <div class="block2-pic hov-img0">
                        <img src="${product.images[0]}" alt="IMG-PRODUCT">

                        <a href="#" data-id="${product._id}" 
                            class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 ">
                            Quick View
                        </a>
                    </div>

                    <div class="block2-txt flex-w flex-t p-t-14">
                        <div class="block2-txt-child1 flex-col-l ">
                            <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                               ${product.name}
                            </a>

                            <span class="stext-105 cl3">
                                ${product.price.toLocaleString('vi')} VND
                            </span>
                        </div>

                        <div class="block2-txt-child2 flex-r p-t-3">
                            <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png"
                                    alt="ICON">
                                <img class="icon-heart2 dis-block trans-04 ab-t-l"
                                    src="images/icons/icon-heart-02.png" alt="ICON">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    listProduct.innerHTML = productHTML; // Gắn toàn bộ HTML vào DOM
    showBoxDetail()

};
document.getElementById("loadMore")!.addEventListener("click", () => {
    loadMore()
})
const loadMore = () => {
    console.log("Load More")
    let currentUrl = window.location.href;
    let url = new URL(currentUrl);
    let currentPage = url.searchParams.get('next') || 0
    currentPage = Number(currentPage) + 1
    url.searchParams.set("next", String(currentPage));
    window.history.pushState({}, "", url);
    loadProduct(currentPage)
}
const loadProduct = async (next: number = 0) => {
    const data: IProduct[] = await product.getAllProducts(Number(next));
    renderProduct(data);
};

loadProduct();


const loadCategory = async () => {
    console.log("d")
    const data: ICategory[] = await category.getCategoryAll();
    const categoryContainer = document.querySelector('#categoryContainer')!
    categoryContainer.innerHTML = ''
    data.forEach((category) => {
        categoryContainer.innerHTML += `<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter="${category._id}">
        ${category.categoryName}
        </button>`
    })
    let filler = document.querySelectorAll('.filter-tope-group button')
    filler.forEach((item) => {
        item.addEventListener('click', async () => {
            let id = item.getAttribute('data-filter')

            let productFilter = await product.getProductByCategoryId(String(id))
            renderProduct(productFilter)

        })
    })
}
loadCategory()

