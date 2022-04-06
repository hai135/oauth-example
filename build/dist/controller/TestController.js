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
exports.TestController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const winston_1 = require("../utils/winston");
let TestController = class TestController {
    constructor() {
        this.logger = new winston_1.LoggerConfig('TestController');
    }
    getAll() {
        this.logger.logger.info('Get test');
        return 'test';
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], TestController.prototype, "getAll", null);
TestController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    (0, typedi_1.Service)()
], TestController);
exports.TestController = TestController;
