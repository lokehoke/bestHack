const algorithms = {
    name: "",
    code: "",
}


class UserPrototype {
    constructor(name, alg, id, isClose = true) {
        this.name = name;
        this.alg = alg;
        this.isClose = isClose;
        this.id = id;
    };
};