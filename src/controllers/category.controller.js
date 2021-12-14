const categoryService = require('../services/category.service');

const updateCategory = async (req, res) => {
    categoryService.updateCategory(req.body).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

const createCategory = async (req, res) => {
    categoryService.createCategory(req.body).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

const listCategory = async (req, res) => {
    categoryService.listCategory(req.body).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

const listCategoryById = async (req, res) => {
    let id = req.params.id
    categoryService.listCategoryById(id).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

const deleteCategory = async (req, res) => {
    let id = req.params.id
    categoryService.deleteCategory(id).then(response =>{
        res.status(response.status).json(response);
    }).catch(error => {
        res.status(error.status).json(error);
    })
}

module.exports = {
    createCategory,
    updateCategory,
    listCategory,
    listCategoryById,
    deleteCategory
}