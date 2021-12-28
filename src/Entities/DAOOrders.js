const dbRef = require('../config/firebase-database')
const repo = require("./DAOFirestore");
const COLLECTION = 'orders'

const saveOrder = (order) => new Promise( async (resolve, reject)  => {
    let {id} = order
    repo.save(COLLECTION,id,order).then(res =>resolve()).catch(error => reject(error))
});

const updateOrder = (order) => new Promise( async (resolve, reject)  => {
    let {id} = order
    repo.update(COLLECTION,id,order).then(res =>resolve()).catch(error => reject(error))
});

const listOrder = () => new Promise( async (resolve, reject)  => {
    repo.listAll(COLLECTION).then(res =>resolve(res)).catch(error => reject(error))
});

const listOrderById = (id) => new Promise( async (resolve, reject)  => {
    repo.findByCollectionAndId(COLLECTION, id).then(res =>resolve(res)).catch(error => reject(error))
});

const listOrderByKeyValue = (key, value) => new Promise( async (resolve, reject)  => {
    repo.findByCollectionAndKey(COLLECTION, key, value).then(res =>resolve(res)).catch(error => reject(error))
});

const deleteOrder = (id) => new Promise( async (resolve, reject)  => {
    repo.deleteItem(COLLECTION, id).then(res =>resolve(res)).catch(error => reject(error))
});

module.exports = {
    saveOrder,
    updateOrder,
    listOrder,
    listOrderById,
    deleteOrder,
    listOrderByKeyValue
}