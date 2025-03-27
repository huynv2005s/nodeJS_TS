import Order from "../class/order.js";
import { message } from "../aler.js";
let order = new Order()
let table = document.querySelector("#table-orders")!
declare var DataTable: any;
const loadOrder = async () => {
    let data = await order.getOrders()
    console.log(data)
    renderOrder(data)
    loadModal()

}

const renderOrder = (data: any) => {
    table.innerHTML = ''
    data.forEach((order: any, index: number) => {
        table.innerHTML += `
           <tr>
                    <td>${index + 1}</td>
                    <td>${order.userId.email}</td>
                    <td>${order.createdAt}</td>
                    <td>${order.totalPrice} VNĐ</td>
                    <td>
                        <p><b>Phương thức: </b>${order.paymentMethod}</p>
                        <p><b>Trạng thái: </b>${order.paymentStatus}</p>
                    </td>
                    <td>${order.status}</td>
                    <td style="text-align:right">
                        <button data-id="${order._id}" class="btn btn-primary orderDetail" data-bs-toggle="modal" data-bs-target="#exampleModal">Xem chi tiết</button>
                    </td> 
                </tr>
        
        `
    })
    new DataTable('#tableOrder');
}
const loadModal = () => {
    let modalUser = document.querySelector('#modalUser')!
    let modalProducts = document.querySelector('#modalProducts')!
    let modalFooter = document.querySelector('.modal-footer')!
    document.querySelectorAll('.orderDetail')!.forEach((item) => {
        item.addEventListener('click', async () => {
            let id = item.getAttribute('data-id')
            let data = await order.getOrderById(String(id))
            modalUser.innerHTML = `
                <p class="card-text"><b>Tên :</b>${data.userId.fullName} </p>
                <p class="card-text"><b>Email :</b>${data.userId.email} </p>
                <p class="card-text"><b>Địa chỉ :</b>${data.info.address} </p>
                <p class="card-text"><b>SĐT :</b>${data.info.phone} </p>
            `
            modalProducts.innerHTML = ''
            data.products.forEach((product: any) => {
                modalProducts.innerHTML += `
                <div class="d-flex align-items-center">
                    <div style="width: 150px;">
                        <img src="${product.images[0]}"
                            style="width: 100%;" alt="">
                    </div>
                    <div>
                        <p class="card-text"> ${product.name} </p>
                        <p class="card-text"><b>Phân loại: </b>${product.size} / ${product.color} </p>
                    </div>
                </div>
            `
            })
            if (data.paymentMethod == 'cod') {
                modalFooter.innerHTML = `
                ${data.status == 'pending' ? `<button type="button" data-status="cancelled" class="btn btn-danger setStatus" data-id="${data._id}" data-bs-dismiss="modal">Hủy</button>` : ''}
                ${data.status == 'pending' ? `<button type="button"  data-status="confirmed" class="btn btn-primary setStatus" data-id="${data._id}" data-bs-dismiss="modal">Xác nhận</button>` :
                        data.status == 'confirmed' ? ` <button type="button" data-status="completed" class="btn btn-primary setStatus" data-id="${data._id}" data-bs-dismiss="modal">Hoàn thành</button>` :
                            data.status == 'completed' ? 'Đơn hàng đã hoàn thành' : '<p class="text-danger">Đơn hàng đã huy</p>'
                    } 
            `
            }
            setStatusOrder()
        })

    })
}
const setStatusOrder = () => {
    document.querySelectorAll(".setStatus").forEach((item) => {
        item.addEventListener("click", async () => {
            let status = item.getAttribute("data-status")
            console.log(status)
            let id = item.getAttribute("data-id")
            try {
                let result: any = await order.setStatusOrder(String(id), String(status))
                message(result.message)
            } catch (error) {
                message("Đã có lỗi xảy ra, vui lòng thử lại!", "error")
            }
            await loadOrder()

        })
    })
}
loadOrder()