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
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
let Question = class Question extends BaseModel_1.BaseModel {
};
__decorate([
    typeorm_1.Column({ comment: '该题的大类型' }),
    __metadata("design:type", String)
], Question.prototype, "question_category", void 0);
__decorate([
    typeorm_1.Column({ length: 500, comment: '题目' }),
    __metadata("design:type", String)
], Question.prototype, "question_title", void 0);
__decorate([
    typeorm_1.Column({ comment: '类型, 1: 单选, 2: 多选 3: 判断' }),
    __metadata("design:type", Number)
], Question.prototype, "question_type", void 0);
__decorate([
    typeorm_1.Column({ length: 100, comment: '答案' }),
    __metadata("design:type", String)
], Question.prototype, "question_answer", void 0);
__decorate([
    typeorm_1.Column({ length: 100, comment: '选项, 使用json字符串存储' }),
    __metadata("design:type", String)
], Question.prototype, "question_selects", void 0);
Question = __decorate([
    typeorm_1.Entity('ex_question')
], Question);
exports.Question = Question;
//# sourceMappingURL=Question.js.map