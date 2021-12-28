class Product {

    id;
    name;
    status;
    description;
    imageKey;
    price;
    haveDiscount;
    discountPrice;
    size;
    category;
    inventary;


    constructor(id, name, status, description, imageKey, price, haveDiscount, discountPrice, size, category, inventary) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.description = description;
        this.imageKey = imageKey;
        this.price = price;
        this.haveDiscount = haveDiscount;
        this.discountPrice = discountPrice;
        this.size = size;
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

    get imageKey() {
        return this.imageKey;
    }

    set imageKey(value) {
        this.imageKey = value;
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

    static from(json){
        return Object.assign(new Product(), json);
    }

    get category() {
        return this.category;
    }

    set category(value) {
        this.category = value;
    }

    get inventary() {
        return this.inventary;
    }

    set inventary(value) {
        this.inventary = value;
    }
}
validate = (obj, isUpdate) => {
    return Object.keys(obj).every(value => {
        if(value == 'discountPrice' && !obj.haveDiscount) {
            return true
        }
        return !(obj[value] === null || obj[value] == undefined);

    });
}

module.exports ={
    Product,
    validate
}