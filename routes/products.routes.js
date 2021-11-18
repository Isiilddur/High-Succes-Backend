const express = require('express')
const productsRoutes = express.Router()

const productsController  = require('../controllers/products.controller');

productsRoutes.get('/product', productsController.listProducts);/*
productsRoutes.get('/product/:category', productsController.listProductsByCategory);
productsRoutes.get('/product/:id', productsController.findProductById);
productsRoutes.post('/product', productsController.createProduct);
productsRoutes.put('/product/:id', productsController.editProduct);
productsRoutes.delete('/product/:id', productsController.deleteProduct);
productsRoutes.get('/admin/product', productsController.listProductsAdmin);*/

module.exports = productsRoutes;