const DAOProducts = require('../Entities/DAOProducts')
const Product = require('../models/Product')

const createProduct = async (body) =>  {
    let category = Product.from(
        {   id:1,
            name:'Producto 1',
            status:1,
            description:'asda',
            imageKey: 'url',
            price:123,
            haveDiscount:true,
            discountPrice: 12,
            size: 'M'
        })
    //DAOProducts.saveData()
    console.log(category.validate());

    console.log(category)
}

module.exports = {
    createProduct
}