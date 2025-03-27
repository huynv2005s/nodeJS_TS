import Category from "../class/category.js";
import { ICategory } from "../type.js";

let category = new Category();

async function loadCategory() {
    let data = await category.getCategoryAll();
    let listCategory = document.getElementById("listCategory")!;
    listCategory.innerHTML = "";
    data.forEach((category: ICategory) => {
        listCategory.innerHTML += `
            <tr>
                <td>${category._id}</td>
                <td>${category.categoryName}</td>
                <td>
                    <button class="openPopupEdit" data-id="${category._id}" data-name="${category.categoryName}">Sửa</button>
                    <button class="deleteCategory" data-id="${category._id}">Xóa</button>
                </td>
            </tr>
        `;
    });

    document.querySelectorAll(".openPopupEdit")!.forEach((item) => {
        item.addEventListener("click", () => {
            let id = item.getAttribute("data-id")!;
            let categoryName = item.getAttribute("data-name")!;
            let input = document.getElementById("categoryName")! as HTMLInputElement;
            let inputId = document.getElementById("id")! as HTMLInputElement;
            input.value = categoryName;
            inputId.value = id;
            inputId.hidden = true;
            togglePopupEdit();
        });
    });
    deleteCategory()
}

loadCategory();

const formEdit = document.getElementById("editCategory")! as HTMLFormElement;
formEdit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formEdit);
    let categoryName = formData.get("categoryName");
    let id = formData.get("_id");

    try {
        const response = await fetch(`http://localhost:8066/api/editCategory/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categoryName })
        });

        if (response.ok) {
            console.log("Cập nhật danh mục thành công");
            // togglePopupEdit();
            loadCategory();
        } else {
            console.error("Lỗi cập nhật danh mục");
        }
    } catch (error) {
        console.error("Lỗi mạng hoặc server:", error);
    }
});

function togglePopupEdit() {
    var popup = document.getElementById("popup-edit")!;
    popup.style.display = popup.style.display === "block" ? "none" : "block";
}

document.getElementById("cancelPopupEdit")!.addEventListener("click", () => {
    togglePopupEdit();
});
const formAdd = document.getElementById("formAdd")! as HTMLFormElement;
formAdd.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formAdd);
    let categoryName = formData.get("categoryName");
    try {
        const response = await fetch(`http://localhost:8066/api/addCategory`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categoryName })
        });

        if (response.ok) {
            console.log("Cập nhật danh mục thành công");
            // togglePopupEdit();
            loadCategory()
        } else {
            console.error("Lỗi cập nhật danh mục");
        }
    } catch (error) {
        console.error("Lỗi mạng hoặc server:", error);
    }
});
const deleteCategory = () => {
    document.querySelectorAll('.deleteCategory').forEach(item => {
        item.addEventListener('click', async () => {
            let id = item.getAttribute('data-id');
            console.log(id);
            try {
                const response = await fetch(`http://localhost:8066/api/deleteCategory/${id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    console.log("Cập nhật danh mục thành công");
                    loadCategory()
                    togglePopupEdit();
                } else {
                    console.error("Lỗi cập nhật danh mục");
                }
            } catch (error) {
                console.error("Lỗi mạng hoặc server:", error);
            }
        })
    })
    togglePopupEdit()
}