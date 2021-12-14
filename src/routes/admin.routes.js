const express = require('express')
const adminRoutes = express.Router()

const adminController = require('../controllers/admin.controller');

adminRoutes.get('/user', adminController.listUsers)
adminRoutes.get('/user/:id', adminController.getUser)
adminRoutes.post('/user', adminController.createUser)
adminRoutes.put('/user', adminController.editUser)
adminRoutes.delete('/user', adminController.deleteUser)

module.exports = adminRoutes;
