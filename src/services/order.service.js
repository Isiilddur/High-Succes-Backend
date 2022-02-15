const {Order, validate} = require("../models/Order");
const Utils = require("../utils/Utils");
const DAOOrder = require("../Entities/DAOOrders");
const {SuccessResponse, ErrorResponse} = require("../models/Responses");
const constants = require("../utils/Constants");


const createOrder = (body) => new Promise((resolve, reject) => {
    let order = Order.from(body)
    order.id = Utils.generateId()
    order.total = order.products.reduce((total, index) => {return total + index.price}, 0)
    if(validate(order)){
        let orderParsed = Utils.parseObjects(order)
        DAOOrder.saveOrder(orderParsed).then(res =>{
            const successResponse = new SuccessResponse(200, res, order.id);
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

const updateOrder = (body) => new Promise((resolve, reject) => {
    let order = Order.from(body)
    if (order.id !== undefined) {
        let orderParsed = Utils.parseObjects(order)
        DAOOrder.updateOrder(orderParsed).then(res =>{
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

const updateStatusOrders = (id, idStatus) => new Promise(async (resolve, reject) => {

    let orderParsed = await DAOOrder.listOrderById(id)
    orderParsed = handleStatus(orderParsed, idStatus)
    DAOOrder.updateOrder(orderParsed).then(res =>{
        const successResponse = new SuccessResponse(200, res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500, constants.ERROR_UPDATING);
        reject(errorResponse)
    })
})

const handleStatus = (order,statusId) => {
    order.status = parseInt(statusId);
    return order
}

const listOrder = () => new Promise((resolve, reject) => {

    DAOOrder.listOrder().then(res =>{
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

const listOrderById = (id) => new Promise((resolve, reject) => {

    DAOOrder.listOrderById(id).then(res =>{
        const successResponse = new SuccessResponse(200, constants.SUCCESS,res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

const listOrderByKeyValue = (key, value) => new Promise((resolve, reject) => {

    DAOOrder.listOrderByKeyValue(key, value).then(res => {
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

const deleteOrder = (id) => new Promise((resolve, reject) => {

    DAOOrder.deleteOrder(id).then(res =>{
        const successResponse = new SuccessResponse(200, res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

module.exports = {
    createOrder,
    updateOrder,
    listOrder,
    listOrderById,
    deleteOrder,
    listOrderByKeyValue,
    updateStatusOrders
}

