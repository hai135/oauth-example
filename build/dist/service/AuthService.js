"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const routing_controllers_1 = require("routing-controllers");
const UserService_1 = require("./UserService");
const typedi_1 = require("typedi");
const User_1 = require("../model/User");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    generateToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return jwt.sign(payload, jwt_1.JWT_SECRET, {
                expiresIn: 30,
            });
        });
    }
    signup(name, email, password, age, address) {
        return __awaiter(this, void 0, void 0, function* () {
            //check user existed
            const userCheck = yield this.userService.getByEmail(email);
            if (userCheck) {
                throw new routing_controllers_1.BadRequestError('Email has existed');
            }
            else {
                const pwd = yield bcrypt.hash(password, 8);
                const user = yield User_1.User.save({
                    name,
                    email,
                    password: pwd,
                    age,
                    address,
                });
                const token = yield this.generateToken({ id: user.id.toString() });
                const rfToken = yield jwt.sign({ id: user.id.toString() }, jwt_1.JWT_SECRET);
                return { user, token, rfToken };
            }
        });
    }
    signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCheck = yield this.userService.getByEmail(email);
            if (!userCheck) {
                throw new routing_controllers_1.BadRequestError("User isn't exist");
            }
            const isMatch = yield bcrypt.compare(password, userCheck.password);
            if (!isMatch) {
                throw new routing_controllers_1.BadRequestError('Unable to login');
            }
            const token = yield this.generateToken({ id: userCheck.id.toString() });
            const rfToken = yield jwt.sign({ id: userCheck.id.toString() }, jwt_1.JWT_SECRET);
            return { userCheck, token, rfToken };
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jwt.verify(refreshToken, jwt_1.JWT_SECRET);
            console.log(payload);
            delete payload.iat;
            const newToken = yield this.generateToken(payload);
            return { token: newToken };
        });
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserService_1.UserService])
], AuthService);
exports.AuthService = AuthService;
