const OrderService = require('../services/OrderService')


const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, isPaid, paidAt } = req.body
        if (!paymentMethod || !itemsPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không được để trống phương thức thanh toán và phương thức giao hàng'
            })
        }
        const respone = await OrderService.createOrder(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu thông tin người dùng'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu thông tin người dùng'
            })
        }
        const response = await OrderService.getDetailsOrder(orderId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}



const cancelOrderDetails = async (req, res) => {
    try {
        const data = req.body.orderItems
        const orderId = req.body.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu thông tin đơn hàng'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}


const DeleteOrders = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu thông tin đơn hàng'
            })
        }
        const respone = await OrderService.DeleteOrders(orderId)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const data = req.body
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu thông tin sản phẩm'
            })
        }
        const respone = await OrderService.updateOrder(orderId, data)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const deleteManyOrder = async (req, res) => {
    try {
        const ids = req.body
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu thông tin đơn hàng'
            })
        }
        const respone = await OrderService.deleteManyOrder(ids)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder,
    DeleteOrders,
    updateOrder,
    deleteManyOrder
}