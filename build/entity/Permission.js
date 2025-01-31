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
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
const typeorm_1 = require("typeorm");
let Permission = class Permission extends BaseModel_1.BaseModel {
};
__decorate([
    typeorm_1.Column({ length: 300 }),
    __metadata("design:type", String)
], Permission.prototype, "permissionName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Permission.prototype, "url", void 0);
Permission = __decorate([
    typeorm_1.Entity('ex_permission')
], Permission);
exports.Permission = Permission;
//# sourceMappingURL=Permission.js.map