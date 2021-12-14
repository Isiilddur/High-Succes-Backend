class Category {
    id;
    name;
    status;
    description;

    constructor(id, name, status, description) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.description = description;
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

    static from(json){
        return Object.assign(new Category(), json);
    }


}

const validate = (obj) => {
    return Object.keys(obj).every(value => {
        if (obj[value] === null || obj[value] == undefined) {
            return false;
        }
        return true;
    });
}

module .exports = {
    Category,
    validate
}