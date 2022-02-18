class Direction {

    street;
    houseNumber;
    deptNumber;
    city;
    state;
    country;
    zip;
    suburb;

    constructor(street, houseNumber, deptNumber, city, state, country, zip, suburb) {
        this.street = street;
        this.houseNumber = houseNumber;
        this.deptNumber = deptNumber;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zip = zip;
        this.suburb = suburb;
    }

    get street() {
        return this.street;
    }

    set street(value) {
        this.street = value;
    }

    get houseNumber() {
        return this.houseNumber;
    }

    set houseNumber(value) {
        this.houseNumber = value;
    }

    get deptNumber() {
        return this.deptNumber;
    }

    set deptNumber(value) {
        this.deptNumber = value;
    }

    get city() {
        return this.city;
    }

    set city(value) {
        this.city = value;
    }

    get state() {
        return this.state;
    }

    set state(value) {
        this.state = value;
    }

    get country() {
        return this.country;
    }

    set country(value) {
        this.country = value;
    }

    get zip() {
        return this.zip;
    }

    set zip(value) {
        this.zip = value;
    }

    get suburb() {
        return this.suburb;
    }

    set suburb(value) {
        this.suburb = value;
    }
    static from(json){
        return Object.assign(new Direction(), json);
    }

    static validate(){
        Object.values(this).every(value => {
            if (value === null || value == undefined) {
                return false;
            }
            return true;
        });
    }

    validate = () => {
        return Object.keys(this).every(value => {
            if(value === 'deptNumber') {
                return true
            }
            return !(this[value] === null || this[value] == undefined);

        });
    }
}

module.exports = Direction
