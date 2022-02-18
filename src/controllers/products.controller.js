'use strict'

const productService = require("../services/product.service");
/**
 * @author Luis Montes
 *
 */
const createProduct = async (req, res) => {
    productService.createProduct(req.body).then(response =>{
        return res.status(response.status).send(response);
    }).catch(error => {
        res.status(error.status).send(error);
    })
}

const updateProduct = async (req, res) => {
    productService.updateProduct(req.body).then(response =>{
        res.status(response.status).send(response);
    }).catch(error => {
        res.status(error.status).send(error);
    })
}

const listProduct = async (req, res) => {
    productService.listProduct(req.body).then(response =>{
        res.status(response.status).send(response);
    }).catch(error => {
        res.status(error.status).send(error);
    })
}

const listProductById = async (req, res) => {
    let id = req.params.id
    productService.listProductById(id).then(response =>{
        res.status(response.status).send(response);
    }).catch(error => {
        res.status(error.status).send(error);
    })
}

const listProductByCategory = async (req, res) => {
    let categoryId = req.params.category
    productService.listProductByCategory(categoryId).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

const deleteProduct = async (req, res) => {
    let id = req.params.id
    productService.deleteProduct(id).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}
const updateInventaryProducts = async (req, res) => {
    let {id, isAdd, items} = req.params

    productService.updateInventaryProducts(id, isAdd, items).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

module.exports = {
    createProduct,
    updateProduct,
    listProduct,
    listProductById,
    deleteProduct,
    listProductByCategory,
    updateInventaryProducts
}
