const DAOCategory = require('../Entities/DAOCategory')
const {Category, validate} = require('../models/Category')
const {ErrorResponse, SuccessResponse} = require("../models/Responses");
const constants = require('../utils/Constants')
const Utils = require('../utils/Utils')

const createCategory = (body) => new Promise((resolve, reject) => {
    let category = Category.from(body)
    category.id = Utils.generateId()
    if(validate(category)){
        let categoryParsed = Utils.parseObjects(category)
        DAOCategory.saveCategory(categoryParsed).then(res =>{
            const successResponse = new SuccessResponse(200, res, category.id);
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

const updateCategory = (body) => new Promise((resolve, reject) => {
    let category = Category.from(body)

    if(validate(category)){
        let categoryParsed = Utils.parseObjects(category)
        DAOCategory.updateCategory(categoryParsed).then(res =>{
            const successResponse = new SuccessResponse(200, res);
            resolve(successResponse);
        }).catch(error => {
            const errorResponse = new ErrorResponse(500, constants.ERROR_UPDATING);
            reject(errorResponse)
        })
    }else{
        const errorResponse = new ErrorResponse(400, constants.BAD_REQUEST);
        reject(errorResponse)
    }
})

const listCategory = () => new Promise((resolve, reject) => {

    DAOCategory.listCategory().then(res =>{
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

const listCategoryById = (id) => new Promise((resolve, reject) => {

    DAOCategory.listCategoryById(id).then(res =>{
        const successResponse = new SuccessResponse(200, constants.SUCCESS,res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

const deleteCategory = (id) => new Promise((resolve, reject) => {

    DAOCategory.deleteCategory(id).then(res =>{
        const successResponse = new SuccessResponse(200, res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

module.exports = {
    createCategory,
    updateCategory,
    listCategory,
    listCategoryById,
    deleteCategory
}

