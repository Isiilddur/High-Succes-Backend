const dbRef = require("../config/firebase-database");
const constants = require("../utils/Constants");

const save = (collectionName, id, data) => new Promise(  (resolve, reject) => {
    try {
         dbRef.collection(collectionName).doc(id.toString()).set(data)
            .then(() => {
                resolve(constants.SUCCESS_SAVE)
            })
            .catch(error => {
                reject(error)
            });
    } catch (e) {
        reject(e);
    }
})

const update = (collectionName, id, data) => new Promise((resolve, reject) => {
    try {
         dbRef.collection(collectionName).doc(id.toString()).update(data)
            .then(() => {
                resolve(constants.SUCCESS_UPDATE)
            })
            .catch(error => {
                reject(error)
            });
    } catch (e) {
        reject(e);
    }
})

const deleteItem = (collectionName, id) => new Promise((resolve, reject) => {
    try {
        dbRef.collection(collectionName).doc(id.toString()).delete()
            .then(() => {
                resolve(constants.SUCCESS_DELETE)
            })
            .catch(error => {
                reject(error)
            });
    } catch (e) {
        reject(e);
    }
})

const listAll = (collectionName) => new Promise((resolve, reject) => {
    try {
        dbRef.collection(collectionName).get()
            .then((querySnapshot) => {
                resolve(querySnapshot)
            })
            .catch(error => {
                reject(error)
            });
    } catch (e) {
        reject(e);
    }
})

const findByCollectionAndId = (collectionName, id) => new Promise((resolve, reject) => {
    try {
        dbRef.collection(collectionName).doc(id).get()
            .then((doc) => {
                if (doc.exists) {
                    resolve(doc.data())
                } else {
                    reject('No such document!')
                }
            })
            .catch(error => {
                reject(error)
            });
    } catch (e) {
        reject(e);
    }
})

const findByKeyValue = (collectionName, key, value) => new Promise((resolve, reject)=> {
    try {
        dbRef.collection(collectionName).where(key, "==", value).get()
            .then((querySnapshot) => {
                resolve(querySnapshot)
            })
            .catch(error => {
                reject(error)
            });
    } catch (e) {
        reject(e);
    }
})


module.exports = {
    save,
    update,
    deleteItem,
    listAll,
    findByCollectionAndId,
    findByKeyValue
}