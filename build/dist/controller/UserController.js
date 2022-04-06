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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const UserService_1 = require("./../service/UserService");
const AuthService_1 = require("./../service/AuthService");
const winston_1 = require("../utils/winston");
const passport_1 = __importDefault(require("./../config/passport"));
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
        this.logger = new winston_1.LoggerConfig('UserController');
    }
    // get all users
    getAll() {
        console.log('abc');
        return '1';
    }
    getOne(id) { }
    // register / create user
    register(user) {
        const { name, email, password, age, address } = user;
        // return this.userService.createUser(name, email, password, age, address);
        return this.authService.signup(name, email, password, age, address);
    }
    login(user) {
        console.log(user);
        return this.authService.signin(user.email, user.password);
    }
    refreshToken(token) {
        return this.authService.refreshToken(token.token);
    }
    logout() { }
    //update profile
    put(id, user) { }
    remove(id) { }
    google() { }
    googleCallback() {
        console.log('in /users/auth/google/callback');
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)('/users/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOne", null);
__decorate([
    (0, routing_controllers_1.Post)('/users'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, routing_controllers_1.Post)('/users/login'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Post)('/users/refresh-token'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "refreshToken", null);
__decorate([
    (0, routing_controllers_1.Get)('/users/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
__decorate([
    (0, routing_controllers_1.Put)('/users/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "put", null);
__decorate([
    (0, routing_controllers_1.Delete)('/users/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, routing_controllers_1.Get)('/users/auth/google'),
    (0, routing_controllers_1.UseBefore)(passport_1.default.authenticate('google', { scope: ['profile', 'email'] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "google", null);
__decorate([
    (0, routing_controllers_1.Get)('/users/auth/google/callback'),
    (0, routing_controllers_1.UseBefore)(passport_1.default.authenticate('google', { failureRedirect: '/login' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "googleCallback", null);
UserController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserService_1.UserService,
        AuthService_1.AuthService])
], UserController);
exports.UserController = UserController;
