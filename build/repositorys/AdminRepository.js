"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Admin_1 = require("../entity/Admin");
let AdminRepository = class AdminRepository extends typeorm_1.AbstractRepository {
    findByUsernameAndPwd(username, password) {
        return this.repository.findOne({ username, password });
    }
    addAdmin(m) {
        return this.repository.save(m);
    }
};
AdminRepository = __decorate([
    typeorm_1.EntityRepository(Admin_1.Admin)
], AdminRepository);
exports.AdminRepository = AdminRepository;
//# sourceMappingURL=AdminRepository.js.map