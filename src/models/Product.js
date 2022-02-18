'use strict'

class Product {

    id;
    name;
    status;
    description;
    imagesKey;
    price;
    haveDiscount;
    discountPrice;
    size;
    category;
    inventary;
    baseImage;

    constructor(id, name, status, description, imagesKey, price, haveDiscount, discountPrice, size, category, inventary, baseImage) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.description = description;
        this.imagesKey = imagesKey;
        this.price = price;
        this.haveDiscount = haveDiscount;
        this.discountPrice = discountPrice;
        this.size = size;
        this.baseImage = baseImage;
        this.category = category;
        this.inventary = inventary;
    }

    get id() {
        return this.id;
    }

    set id(value) {
        this.id = value;
    }

    get name() {
        return this.name;
    }

    set name(value) {
        this.name = value;
    }

    get status() {
        return this.status;
    }

    set status(value) {
        this.status = value;
    }

    get description() {
        return this.description;
    }

    set description(value) {
        this.description = value;
    }

    get imagesKey() {
        return this.imagesKey;
    }

    set imagesKey(value) {
        this.imagesKey = value;
    }

    get price() {
        return this.price;
    }

    set price(value) {
        this.price = value;
    }

    get haveDiscount() {
        return this.haveDiscount;
    }

    set haveDiscount(value) {
        this.haveDiscount = value;
    }

    get discountPrice() {
        return this.discountPrice;
    }

    set discountPrice(value) {
        this.discountPrice = value;
    }

    get size() {
        return this.size;
    }

    set size(value) {
        this.size = value;
    }


    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get inventary() {
        return this._inventary;
    }

    set inventary(value) {
        this._inventary = value;
    }

    get baseImage() {
        return this._baseImage;
    }

    set baseImage(value) {
        this._baseImage = value;
    }

    static from(json){
        return Object.assign(new Product(), json);
    }

     validate = () => {
        return Object.keys(this).every(value => {
            if(value == 'discountPrice' && !this.haveDiscount) {
                return true
            }
            return !(this[value] === null || this[value] == undefined);

        });
    }
}

module.exports = Product;
