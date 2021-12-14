'use strict'

const productService = require('../services/product.service.js')
/**
 * @author Luis Montes
 *
 */
const listProducts = async (req, res) => {
    return res.status(200).json({msg:'Ok'})
}

const createProduct = async (req, res) => {

    let response = productService.createProduct(req.body).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })

}

module.exports = {
    listProducts,
    createProduct
}