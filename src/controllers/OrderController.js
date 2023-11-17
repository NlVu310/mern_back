const OrderService = require('../services/OrderService')


const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body
        if (!paymentMethod || !itemsPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
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


module.exports = {
    createOrder
}