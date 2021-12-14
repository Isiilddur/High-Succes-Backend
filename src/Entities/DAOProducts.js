const dbRef = require('../config/firebase-database')
const saveData = () => {
    try {
        dbRef.collection("cities").doc("LA").set({
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    } catch (e) {
        console.error(e)

    }
}

module.exports = {
    saveData
}