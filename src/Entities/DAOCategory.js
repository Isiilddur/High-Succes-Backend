const dbRef = require('../config/firebase-database')
const constants = require('../utils/Constants')
const repo = require('./DAOFirestore')

const COLLECTION = 'categories'

const saveCategory = (category) => new Promise( async (resolve, reject)  => {
    let {id} = category
    repo.save(COLLECTION,id,category).then(res =>resolve()).catch(error => reject(error))
});

const updateCategory = (category) => new Promise( async (resolve, reject)  => {
    let {id} = category
    repo.update(COLLECTION,id,category).then(res =>resolve()).catch(error => reject(error))
});

const listCategory = () => new Promise( async (resolve, reject)  => {
    repo.listAll(COLLECTION).then(res =>resolve(res)).catch(error => reject(error))
});

const listCategoryById = (id) => new Promise( async (resolve, reject)  => {
    repo.findByCollectionAndId(COLLECTION, id).then(res =>resolve(res)).catch(error => reject(error))
});

const deleteCategory = (id) => new Promise( async (resolve, reject)  => {
    repo.deleteItem(COLLECTION, id).then(res =>resolve(res)).catch(error => reject(error))
});

module.exports = {
    saveCategory,
    updateCategory,
    listCategory,
    listCategoryById,
    deleteCategory
}