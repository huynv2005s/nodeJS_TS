import { Get, Post } from '../fetch.js'
export default class Order {
    checkout = (data: any) => {
        let result = Post('checkout', data)
        return result
    }
    getOrders = () => {
        let result = Get('getOrders')
        return result
    }
    getOrderById = (id: string) => {
        let result = Get(`getOrderById/${id}`)
        return result
    }
    setStatusOrder = (id: string, status: string) => {
        let result = Get(`setStatusOrder/${id}/${status}`)
        return result
    }
}