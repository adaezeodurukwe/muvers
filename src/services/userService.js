import models from "../database/models";

const { User } = models;

export default class UserService {
    static find(where) {
        return User.findOne({ where });
    }
    static findAll(where) {
        return User.findAll({ where });
    }
    static create(data) {
        return User.create(data);
    }
    static update(data, where) {
        return User.update(data, { returnung: true, where });
    }
    static delete(where) {
        return User.delete({ where });
    }
}