const generateId = () => {
    let date = new Date();
    return date.getTime();
}

const parseObjects = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

module.exports = {
    generateId,
    parseObjects
}