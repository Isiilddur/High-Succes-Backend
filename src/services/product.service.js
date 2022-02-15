const {Product, validate} = require("../models/Product");
const Utils = require("../utils/Utils");
const DAOProduct = require("../Entities/DAOProducts");
const {SuccessResponse, ErrorResponse} = require("../models/Responses");
const constants = require("../utils/Constants");


const createProduct = (body) => new Promise((resolve, reject) => {
    let product = Product.from(body)
    product.id = Utils.generateId()
    if(validate(product)){
        let productParsed = Utils.parseObjects(product)
        DAOProduct.saveProduct(productParsed).then(res =>{
            const successResponse = new SuccessResponse(200, res, product.id);
            resolve(successResponse);
        }).catch(error => {
            const errorResponse = new ErrorResponse(500, error);
            reject(errorResponse)
        })
    }else{
        const errorResponse = new ErrorResponse(400, constants.BAD_REQUEST);
        reject(errorResponse)
    }
})

const updateProduct = (body) => new Promise((resolve, reject) => {
    let product = Product.from(body)
    if (product.id !== undefined) {
        let productParsed = Utils.parseObjects(product)
        DAOProduct.updateProduct(productParsed).then(res =>{
            const successResponse = new SuccessResponse(200, res);
            resolve(successResponse);
        }).catch(error => {
            const errorResponse = new ErrorResponse(500, constants.ERROR_UPDATING);
            reject(errorResponse)
        })
    }else{
        const errorResponse = new ErrorResponse(500, constants.BAD_REQUEST);
        reject(errorResponse)
    }
})

const updateInventaryProducts = (id, isAdd, items) => new Promise(async (resolve, reject) => {

    let productParsed = await DAOProduct.listProductById(id)
    productParsed = handleInventary(productParsed, isAdd, items)
    DAOProduct.updateProduct(productParsed).then(res =>{
        const successResponse = new SuccessResponse(200, res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500, constants.ERROR_UPDATING);
        reject(errorResponse)
    })
})

const handleInventary = (product, isAdd, items) => {
    if(isAdd === "true"){
        product.inventary += parseInt(items);
    }else{
        product.inventary -= parseInt(items);
    }
    return product
}

const listProduct = () => new Promise((resolve, reject) => {

    DAOProduct.listProduct().then(res =>{
        let result = []
        res.forEach(doc => {
            result.push(doc.data())
        });
        const successResponse = new SuccessResponse(200, constants.SUCCESS,result);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

const listProductById = (id) => new Promise((resolve, reject) => {

    DAOProduct.listProductById(id).then(res =>{
        const successResponse = new SuccessResponse(200, constants.SUCCESS,res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

const listProductByCategory = (categoryId) => new Promise((resolve, reject) => {

    DAOProduct.listProductByKeyValue("category", categoryId).then(res =>{
        let result = []
        res.forEach(doc => {
            result.push(doc.data())
        });
        const successResponse = new SuccessResponse(200, constants.SUCCESS,result);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

const deleteProduct = (id) => new Promise((resolve, reject) => {

    DAOProduct.deleteProduct(id).then(res =>{
        const successResponse = new SuccessResponse(200, res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

module.exports = {
    createProduct,
    updateProduct,
    listProduct,
    listProductById,
    deleteProduct,
    listProductByCategory,
    updateInventaryProducts
}

