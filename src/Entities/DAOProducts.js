const dbRef = require('../config/firebase-database')
const repo = require("./DAOFirestore");
const COLLECTION = 'products'

const saveProduct = (product) => new Promise( async (resolve, reject)  => {
    let {id} = product
    repo.save(COLLECTION,id,product).then(res =>resolve()).catch(error => reject(error))
});

const updateProduct = (product) => new Promise( async (resolve, reject)  => {
    let {id} = product
    repo.update(COLLECTION,id,product).then(res =>resolve()).catch(error => reject(error))
});

const listProduct = () => new Promise( async (resolve, reject)  => {
    repo.listAll(COLLECTION).then(res =>resolve(res)).catch(error => reject(error))
});

const listProductById = (id) => new Promise( async (resolve, reject)  => {
    repo.findByCollectionAndId(COLLECTION, id).then(res =>resolve(res)).catch(error => reject(error))
});

const listProductByKeyValue = (key, value) => new Promise( async (resolve, reject)  => {
    repo.findByCollectionAndKey(COLLECTION, key, value).then(res =>resolve(res)).catch(error => reject(error))
});

const deleteProduct = (id) => new Promise( async (resolve, reject)  => {
    repo.deleteItem(COLLECTION, id).then(res =>resolve(res)).catch(error => reject(error))
});

module.exports = {
    saveProduct,
    updateProduct,
    listProduct,
    listProductById,
    deleteProduct,
    listProductByKeyValue
}