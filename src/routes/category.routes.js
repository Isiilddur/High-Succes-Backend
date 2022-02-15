const express = require('express')
const categoryRoutes = express.Router()

const categoryController = require("../controllers/category.controller");

categoryRoutes.post('/category', categoryController.createCategory);
categoryRoutes.put('/category', categoryController.updateCategory);
categoryRoutes.get('/category', categoryController.listCategory);
categoryRoutes.get('/category/:id', categoryController.listCategoryById);
categoryRoutes.delete('/category/:id', categoryController.deleteCategory);

module.exports = categoryRoutes;