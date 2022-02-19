const Utils = require("../utils/Utils");
const DAOProduct = require("../Entities/DAOProducts");
const {SuccessResponse, ErrorResponse} = require("../models/Responses");
const constants = require("../utils/Constants");
const Product = require("../models/Product");
const AWS = require('aws-sdk');
const fs = require('fs');

const ID = process.env.ID;
const SECRET = process.env.SECRET;
const BUCKET_NAME = "high-success"

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (file) => new Promise((resolve, reject) =>{
    // Read content from the file

    // Setting up S3 upload parameters

    let buf = Buffer.from(file.data.replace(/^data:image\/\w+;base64,/, ""),'base64')
    const params = {
        Bucket: BUCKET_NAME,
        Key: file.nombre, // File name you want to save as in S3
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: `image/${file.nombre.split(".")[1]}`
    };

    s3.upload(params, function(err, data){
        if (err) {
            reject(data)
        } else {
            resolve(data);
        }
    });

});


const createProduct = (body) => new Promise(async (resolve, reject) => {
    try{
        let product = Product.from(body)
        product.id = Utils.generateId()
        if(validate(product)){
            if(product.imagesKey != undefined){
                product.imagesKey = await uploadImages(product.imagesKey)
            }
            if(product.baseImage != undefined){
                product.baseImage = await uploadImages(product.baseImage)
            }
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
    }catch (e){
        const errorResponse = new ErrorResponse(400, constants.BAD_REQUEST);
        reject(errorResponse)
    }

})

const uploadImages = (data) => new Promise(async (resolve, reject) => {
    let result = []
    for (const images of data) {
        await uploadFile(images).then(res =>{
            result.push(res.Location)
        }).catch(err=>{
            reject([])
        })
    }
    resolve(result)
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

    let response = {}
    DAOProduct.listProduct().then(res =>{
        res.forEach(doc => {
            let temp = doc.data()
            if(response[temp.category]){
                response[temp.category].push(doc.data())
            }else{
                response[temp.category] = []
                response[temp.category].push(doc.data())
            }
        });
        const successResponse = new SuccessResponse(200, constants.SUCCESS,response);
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
    updateInventaryProducts,

}

