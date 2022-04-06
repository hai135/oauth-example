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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerConfig = void 0;
const winston = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
class LoggerConfig {
    constructor(moduleName) {
        this.moduleName = moduleName;
        const levels = {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            debug: 4,
        };
        const level = () => {
            const env = process.env.NODE_ENV || 'development';
            const isDevelopment = env === 'development';
            return isDevelopment ? 'debug' : 'warn';
        };
        const colors = {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            http: 'magenta',
            debug: 'white',
        };
        winston.addColors(colors);
        const format = winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.align(), winston.format.printf((info) => {
            const { timestamp, level, message, stack } = info;
            if (stack)
                return `[${timestamp}] [${level}]: ${stack}`;
            return `[${timestamp}] [${level}]: ${message}`;
        }));
        const transports = [
            new winston.transports.Console({
                level: 'debug',
                // prettyPrint: true,
                handleExceptions: true,
            }),
            new winston_daily_rotate_file_1.default({
                level: 'info',
                dirname: `./src/logs/%DATE%`,
                filename: `${this.moduleName}.log`,
                // filename: 'log-%DATE%.log',
                format: winston.format.uncolorize(),
                // datePattern: 'YYYY-MM-DD HH-mm',
                datePattern: 'YYYY-MM-DD',
                // zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
            }),
            // new winston.transports.File({
            //     level: 'info',
            //     dirname: `./src/logs/${${new Date().toISOString().slice(0, 10)}}`,
            //     filename: `${this.moduleName}.log`,
            //     // filename: 'log-%DATE%.log',
            //     format: winston.format.uncolorize(),
            // datePattern: 'YYYY-MM-DD',
            // zippedArchive: true,
            // maxSize: '20m',
            // maxFiles: '14d',
            // }),
        ];
        this.logger = winston.createLogger({
            level: level(),
            levels,
            format,
            transports,
        });
    }
}
exports.LoggerConfig = LoggerConfig;
// console.log(new LoggerConfig('hello'));
// export default logger;
