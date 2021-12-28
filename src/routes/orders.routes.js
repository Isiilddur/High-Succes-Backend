const express = require('express')
const orderRoutes = express.Router()
const orderController = require("../controllers/orders.controller");

orderRoutes.get('/order', orderController.listOrder);
orderRoutes.get('/order/:key/:value', orderController.listOrderByKeyValue);
orderRoutes.get('/order/:id', orderController.listOrderById);
orderRoutes.post('/order', orderController.createOrder);
orderRoutes.put('/order/', orderController.updateOrder);
orderRoutes.put('/order/:id/:status', orderController.updateStatusOrders);
orderRoutes.delete('/order/:id', orderController.deleteOrder);

module.exports = orderRoutes;

