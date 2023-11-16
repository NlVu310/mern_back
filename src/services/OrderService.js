const Order = require('../models/OrderProductModel')
// const bcrypt = require("bcrypt")
// const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder
        const createdOrder = await Order.create({
            orderItems,
            shippingAddress: {
                fullName,
                address,
                city, phone
            },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user: user,
        })
        console.log(createdOrder)
        if (createdOrder) {
            resolve({
                status: 'OK',
                message: 'Success',
                data: createdOrder,
            })
        }
    })
}

module.exports = {
    createOrder
}