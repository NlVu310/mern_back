const express = require("express")
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware")

router.post('/create/:id', authUserMiddleWare, OrderController.createOrder)
router.get('/get-all-order-by-id/:id', authUserMiddleWare, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.delete('/cancel-order/:id', authUserMiddleWare, OrderController.cancelOrderDetails)
router.get('/get-all-order', OrderController.getAllOrder)
router.delete('/delete-order/:id', OrderController.DeleteOrders)
router.put('/update/:id', OrderController.updateOrder)




module.exports = router     