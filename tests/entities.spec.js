const Product = require('../src/models/Product')
const Category = require('../src/models/Category')
const Direction = require('../src/models/Direction')
const Order = require('../src/models/Order')

const chai = require('chai')
const expect = chai.expect

describe('Entities test', function () {
    describe('Products test', function (){
        it('should be valid', () => {
            let json =
            {   id:1,
                name:'Producto 1',
                status:1,
                description:'asda',
                imageKey: 'url',
                price:123,
                haveDiscount:true,
                discountPrice: 12,
                size: 'M'
            }
            let product = Product.from(json);
            expect(product.validate()).to.be.true
        })
        it('should be invalid', () => {
            let json =
                {   id:1,
                    name:'Producto 1',
                    status:1,
                    description:'asda',
                    imageKey: 'url',
                    price:123,
                    haveDiscount:true,
                    size: 'M'
                }
            let product = Product.from(json);
            expect(product.validate()).to.be.false
        })
        it('should be valid', () => {
            let json =
                {   id:1,
                    name:'Producto 1',
                    status:1,
                    description:'asda',
                    imageKey: 'url',
                    price:123,
                    haveDiscount:false,
                    size: 'M'
                }
            let product = Product.from(json);
            expect(product.validate()).to.be.true
        })
        it('should be valid', () => {
        let json =
            {   id:1,
                name:'Producto 1',
                status:1,
                description:'asda',
                imageKey: 'url',
                price:123,
                haveDiscount:false,
                discountPrice: 12,
                size: 'M'
            }
        let product = Product.from(json);
        expect(product.validate()).to.be.true
    })
    })
    describe('Category test', function () {
        it('should be valid', () => {
            let json =
                {   id:1,
                    name:'Producto 1',
                    status:1,
                    description:'asda',
                }
            let product = Category.from(json);
            expect(product.validate()).to.be.true
        })
        it('should be invalid', () => {
            let json =
                {   id:1,
                    name:'Producto 1',
                    description:'asda',
                }
            let product = Category.from(json);
            expect(product.validate()).to.be.false
        })
        it('should be invalid', () => {
            let json =
                {   id:1,
                    status:1,
                    description:'asda',
                }
            let product = Category.from(json);
            expect(product.validate()).to.be.false
        })
        it('should be invalid', () => {
            let json =
                {
                    name:'Producto 1',
                    status:1,
                    description:'asda',
                }
            let product = Category.from(json);
            expect(product.validate()).to.be.false
        })
    })
    describe('Direction test', function () {
        it('should be valid', () => {
            let json =
                {
                    street: 'Street',
                    houseNumber: 'Street',
                    deptNumber: 'Street',
                    city: 'Street',
                    state: 'Street',
                    country: 'Street',
                    zip: 'Street',
                    suburb: 'Street',
                }
            let direction = Direction.from(json);
            expect(direction.validate()).to.be.true
        })
        it('should be invalid', () => {
            let json =
                {
                    street: 'Street',
                    houseNumber: 'Street',
                    city: 'Street',
                    state: 'Street',
                    country: 'Street',
                    zip: 'Street',
                    suburb: 'Street',
                }
            let direction = Direction.from(json);
            expect(direction.validate()).to.be.true
        })
        it('should be invalid', () => {
            let json =
                {
                    street: 'Street',
                    deptNumber: 'Street',
                    city: 'Street',
                    state: 'Street',
                    country: 'Street',
                    zip: 'Street',
                    suburb: 'Street',
                }
            let direction = Direction.from(json);
            expect(direction.validate()).to.be.false
        })
        it('should be invalid', () => {
            let json =
                {
                    street: 'Street',
                    houseNumber: 'Street',
                    deptNumber: 'Street',
                    city: 'Street',
                    state: 'Street',
                    zip: 'Street',
                    suburb: 'Street',
                }
            let direction = Direction.from(json);
            expect(direction.validate()).to.be.false
        })
    })
    describe('Order test', function () {
        it('should be valid', () => {
            let json =
                {
                    id: 'Street',
                    email: 'Street',
                    direction: 'Street',
                    phone: 'Street',
                    products: 'Street',
                    status: 1,
                    total: 500
                }
            let order = Order.from(json);
            expect(order.validate()).to.be.true
        })
        it('should be invalid', () => {
            let json =
                {
                    id: 'Street',
                    email: 'Street',
                    direction: 'Street',
                    phone: 'Street',
                    status: 1,
                    total: 500
                }
            let order = Order.from(json);
            expect(order.validate()).to.be.false
        })
        it('should be invalid', () => {
            let json =
                {
                    id: 'Street',
                    email: 'Street',
                    direction: 'Street',
                    phone: 'Street',
                    products: 'Street',
                    total: 500
                }
            let order = Order.from(json);
            expect(order.validate()).to.be.false
        })
        it('should be invalid', () => {
            let json =
                {
                    id: 'Street',
                    direction: 'Street',
                    phone: 'Street',
                    products: 'Street',
                    status: 1,
                    total: 500
                }
            let order = Order.from(json);
            expect(order.validate()).to.be.false
        })
    })

});

