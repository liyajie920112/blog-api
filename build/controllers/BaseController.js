"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const ReturnModel_1 = require("../viewmodel/ReturnModel");
let BaseController = class BaseController {
    returnData(data, msg = 'success') {
        if (!data) {
            msg = 'error';
        }
        return new ReturnModel_1.ReturnModel(data || '', msg);
    }
    returnError(error) {
        return new ReturnModel_1.ReturnModel('', 'error', -1, error);
    }
    returnSuccess(data) {
        return new ReturnModel_1.ReturnModel(data);
    }
};
BaseController = __decorate([
    routing_controllers_1.Controller()
], BaseController);
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map