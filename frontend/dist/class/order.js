import { Get, Post } from '../fetch.js';
export default class Order {
    constructor() {
        this.checkout = (data) => {
            let result = Post('checkout', data);
            return result;
        };
        this.getOrders = () => {
            let result = Get('getOrders');
            return result;
        };
        this.getOrderById = (id) => {
            let result = Get(`getOrderById/${id}`);
            return result;
        };
        this.setStatusOrder = (id, status) => {
            let result = Get(`setStatusOrder/${id}/${status}`);
            return result;
        };
    }
}
//# sourceMappingURL=order.js.map