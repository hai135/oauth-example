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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const User_1 = require("./model/User");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const UserController_1 = require("./controller/UserController");
const TestController_1 = require("./controller/TestController");
const TodoController_1 = require("./controller/TodoController");
const database_1 = require("./loaders/database");
const jwt = __importStar(require("jsonwebtoken"));
const jwt_1 = require("./config/jwt");
const passport_1 = __importDefault(require("./config/passport"));
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// const passport = require('passport');
// const GOOGLE_CLIENT_ID =
//     '13195484357-cn6p7k5v9odtk5fff1lj74iksf7s2iv0.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = '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';
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: GOOGLE_CLIENT_ID,
//             clientSecret: GOOGLE_CLIENT_SECRET,
//             callbackURL: 'http://localhost:3001/users/auth/google/callback',
//         },
//         function (accessToken, refreshToken, profile, done) {
//             console.log('profile');
//             return done(null, profile);
//         }
//     )
// );
let Application = 
// creates express app, registers all controller routes and returns you express app instance
class Application {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.AppDataSource.initialize();
                console.log('Connected to database!!!');
            }
            catch (err) {
                console.log(err);
            }
            const app = (0, routing_controllers_1.createExpressServer)({
                currentUserChecker: (action) => __awaiter(this, void 0, void 0, function* () {
                    const [_, token] = action.request.headers['authorization'].split(' ');
                    try {
                        const decode = jwt.verify(token, jwt_1.JWT_SECRET, {
                        // ignoreExpiration: true,
                        });
                        // console.log(decode);
                        return User_1.User.findOneBy({ id: +decode.id });
                    }
                    catch (error) {
                        console.log(error);
                    }
                }),
                controllers: [TodoController_1.TodoController, TestController_1.TestController, UserController_1.UserController], // we specify controllers we want to use
            });
            app.use(passport_1.default.initialize());
            // run express application on port 3001
            app.listen(3001);
        });
    }
};
Application = __decorate([
    (0, typedi_1.Service)()
    // creates express app, registers all controller routes and returns you express app instance
], Application);
exports.Application = Application;
