const express = require('express')
const productsRoutes = express.Router()

const productsController  = require('../controllers/products.controller');

productsRoutes.get('/product', productsController.listProduct);
productsRoutes.get('/product/category/:category', productsController.listProductByCategory);
productsRoutes.get('/product/:id', productsController.listProductById);
productsRoutes.post('/product', productsController.createProduct);
productsRoutes.put('/product', productsController.updateProduct);
productsRoutes.put('/product/:id/:isAdd/:items', productsController.updateInventaryProducts);
productsRoutes.delete('/product/:id', productsController.deleteProduct);
//productsRoutes.get('/admin/product', productsController.listProductsAdmin);

module.exports = productsRoutes;
