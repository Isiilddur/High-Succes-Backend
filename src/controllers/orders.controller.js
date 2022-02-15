const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
    orderService.createOrder(req.body).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

const updateOrder = async (req, res) => {
    orderService.updateOrder(req.body).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

const listOrder = async (req, res) => {
    orderService.listOrder(req.body).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

const listOrderById = async (req, res) => {
    let id = req.params.id
    orderService.listOrderById(id).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

const listOrderByKeyValue = async (req, res) => {
    let {key, value} = req.params
    orderService.listOrderByKeyValue(key, value).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

const deleteOrder = async (req, res) => {
    let id = req.params.id
    orderService.deleteOrder(id).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}
const updateStatusOrders = async (req, res) => {
    let {id, status} = req.params

    orderService.updateStatusOrders(id, status).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

module.exports = {
    createOrder,
    updateOrder,
    listOrder,
    listOrderById,
    deleteOrder,
    listOrderByKeyValue,
    updateStatusOrders
}