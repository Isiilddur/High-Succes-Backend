const express = require('express')
const ordersRoutes = express.Router()

const ordersController  = require('../controllers/orders.controller');

ordersRoutes.post('/order/', ordersController.createOrder);
ordersRoutes.get('/order/:id', ordersController.findOrderById);
ordersRoutes.delete('/order/:id', ordersController.deleteOrder);
ordersRoutes.put('/order/:id', ordersController.editOrder);
ordersRoutes.get('/order', ordersController.listOrders);
ordersRoutes.get('/order/:status', ordersController.listOrdersByStatus);
ordersRoutes.put('/order/:status', ordersController.editOrderStatus);


module.exports = ordersRoutes;
/*
*   Following endpoints are not mandatory yet
*   Posisbly this should be changed to another controller
* ordersRoutes.get('/order/:status', ordersController.editOrderStatus);
* ordersRoutes.get('/order/:status', ordersController.editOrderStatus);
* ordersRoutes.get('/order/:status', ordersController.editOrderStatus);
* ordersRoutes.get('/order/:status', ordersController.editOrderStatus);
* ordersRoutes.get('/order/:status', ordersController.editOrderStatus);
*
* */






module.exports = adminRoutes;
