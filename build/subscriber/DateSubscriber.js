"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
let DateSubscriber = class DateSubscriber {
    afterLoad(entry) {
        for (let key in entry) {
            if (key.endsWith('Time')) {
                entry[`${key}Str`] = entry[key] ? date_fns_1.format(entry[key], 'yyyy-MM-dd HH:mm:ss') : '';
            }
        }
    }
};
DateSubscriber = __decorate([
    typeorm_1.EventSubscriber()
], DateSubscriber);
exports.DateSubscriber = DateSubscriber;
//# sourceMappingURL=DateSubscriber.js.map