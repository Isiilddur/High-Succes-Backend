class Order {

    id;
    email;
    direction;
    phone;
    products;
    status;
    total;
    date;


    constructor(id, email, direction, phone, products, status, total) {
        this.id = id;
        this.email = email;
        this.direction = direction;
        this.phone = phone;
        this.products = products;
        this.status = status;
        this.total = total;
        this.date = new Date().toLocaleDateString();
    }

    get id() {
        return this.id;
    }

    set id(value) {
        this.id = value;
    }

    get email() {
        return this.email;
    }

    set email(value) {
        this.email = value;
    }

    get direction() {
        return this.direction;
    }

    set direction(value) {
        this.direction = value;
    }

    get phone() {
        return this.phone;
    }

    set phone(value) {
        this.phone = value;
    }

    get products() {
        return this.products;
    }

    set products(value) {
        this.products = value;
    }

    get status() {
        return this.status;
    }

    set status(value) {
        this.status = value;
    }

    get total() {
        return this.total;
    }

    set total(value) {
        this.total = value;
    }

    static from(json){
        return Object.assign(new Order(), json);
    }


}
validate = () => {
    return Object.keys(this).every(value => {
        return !(this[value] === null || this[value] == undefined);
    });
}

module.exports = {
    Order,
    validate
}