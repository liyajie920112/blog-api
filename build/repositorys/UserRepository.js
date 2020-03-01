"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Users_1 = require("../entity/Users");
const common_1 = require("../utils/common");
let UserRepository = class UserRepository extends typeorm_1.AbstractRepository {
    addUser(m) {
        return this.repository.save(m);
    }
    getUserByUsernameAndPwd(username, password) {
        const _md5pwd = common_1.getMd5(password);
        return this.repository.findOne({ username, password: _md5pwd });
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(Users_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map