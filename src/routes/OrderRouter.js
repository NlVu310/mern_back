const express = require("express")
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const { authUserMiddleWare } = require("../middleware/authMiddleware")

router.post('/create/:id', authUserMiddleWare, OrderController.createOrder)
router.get('/get-order-details/:id', authUserMiddleWare, OrderController.getOrderDetails)


module.exports = router     