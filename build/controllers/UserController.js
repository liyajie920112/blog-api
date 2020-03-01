"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const AdminRepository_1 = require("../repositorys/AdminRepository");
const BaseController_1 = require("./BaseController");
const Users_1 = require("../entity/Users");
const UserRepository_1 = require("../repositorys/UserRepository");
const common_1 = require("../utils/common");
let UserController = class UserController extends BaseController_1.BaseController {
    getUserByNameAndPwd(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const bbAdminRepository = typeorm_1.getCustomRepository(AdminRepository_1.AdminRepository);
            const r = yield bbAdminRepository.findByUsernameAndPwd(params.username, params.password);
            return this.returnData(r);
        });
    }
    addUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new Users_1.User();
            model.username = 'test';
            model.password = common_1.getMd5('111111');
            const repo = typeorm_1.getCustomRepository(UserRepository_1.UserRepository);
            yield repo.addUser(model);
            return this.returnSuccess(model);
        });
    }
};
__decorate([
    routing_controllers_1.Get('/list'),
    __param(0, routing_controllers_1.QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByNameAndPwd", null);
__decorate([
    routing_controllers_1.Get('/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
UserController = __decorate([
    routing_controllers_1.JsonController('/user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map