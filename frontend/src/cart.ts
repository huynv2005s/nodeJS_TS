import { getCart, removeCart, updateCart } from "./handleCart.js";
import Order from "./class/order.js";
import { message } from "./aler.js";
let btnCheckout = document.querySelector("#btn-checkout")! as HTMLButtonElement;
let formCheckout = document.querySelector("#formCheckout")! as HTMLFormElement;
let order = new Order()
const loadCart = () => {
    let listCart = getCart()
    renderCart(listCart)
    updateQuantity()
    remove()
    console.log(listCart)
}
const renderCart = (data: any) => {
    let cartItem = document.querySelector("#cartItem")!
    cartItem.innerHTML = ''
    // console.log(data.length)
    if (data.length > 0) {
        let totalPrice = 0
        data.forEach((item: any, index: number) => {
            let sum = Number(item.price) * item.quantity
            totalPrice += sum
            cartItem.innerHTML += `
                    <tr class="table_row">
                                        <td class="column-1">
                                            <div class="how-itemcart1 itemCart" data-index="${index}">
                                                <img src="${item.images[0]}" alt="IMG">
                                            </div>
                                        </td>
                                        <td class="column-2">
                                            <p style="font-size: 12px">${item.name}</p>
                                            <p><b>Phân loại: </b>${item.color} / ${item.size}</p>
                                        </td>
                                        <td class="column-3">${item.price.toLocaleString('vi')}</td>
                                        <td class="column-4">
                                            <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                                <div data-index="${index}" class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                    <i class="fs-16 zmdi zmdi-minus"></i>
                                                </div>
    
                                                <input class="mtext-104 cl3 txt-center num-product" type="number" min="1" value="${item.quantity}">
    
                                                <div data-index="${index}" class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                                    <i class="fs-16 zmdi zmdi-plus"></i>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="column-5">${sum.toLocaleString('vi')} VNĐ</td>
                                    </tr>
            `
        })

        let total = document.getElementById('totalPrice')! as HTMLInputElement
        total.value = String(totalPrice)
    } else {
        cartItem.innerHTML = `<p class="p-2">Giỏ hàng trống</p>`
    }
}
console.log(formCheckout)
btnCheckout.addEventListener("click", async (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('userLogin')!)
    console.log(user)
    if (!user) {
        window.location.href = './login.html'
        return
    }
    let listCart = JSON.stringify(getCart())
    if (!listCart || listCart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }
    let form = new FormData(formCheckout)
    form.append('cart', listCart)
    try {
        let result = await order.checkout(form)
        localStorage.removeItem("listCart");
        if (form.get('paymentMethod') == "bank_transfer") {
            window.location = result.linkCheckout
        }
        message(result.message)
    } catch (error) {
        message("Đã có lỗi xảy ra", "error")
    }
})
const remove = async () => {
    document.querySelectorAll('.itemCart').forEach((item: any) => {
        item.addEventListener("click", () => {
            let index = item.getAttribute("data-index")
            removeCart(index)
            loadCart()
        })
    })
}
const updateQuantity = () => {
    document.querySelectorAll('.num-product').forEach((input: any) => {
        input.addEventListener("change", (e: any) => {
            let index = e.target.getAttribute("data-index")
            let newQuantity = parseInt(e.target.value)
            updateCart(index, newQuantity)
            loadCart()
        })
    })
    document.querySelectorAll('.btn-num-product-up').forEach((btn: any) => {
        btn.addEventListener("click", () => {
            let index = btn.getAttribute("data-index")
            let listCart = getCart()
            listCart[index].quantity++
            updateCart(index, listCart[index].quantity)
            loadCart()
        })
    })
    document.querySelectorAll('.btn-num-product-down').forEach((btn: any) => {
        btn.addEventListener("click", () => {
            let index = btn.getAttribute("data-index")
            let listCart = getCart()
            if (listCart[index].quantity > 1) {
                listCart[index].quantity--
                updateCart(index, listCart[index].quantity)
                loadCart()
            }
        })
    })
}
loadCart()