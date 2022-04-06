import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export class LoggerConfig {
    public logger: winston.Logger;
    constructor(public moduleName: string) {
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

        const format = winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.align(),
            winston.format.printf((info) => {
                const { timestamp, level, message, stack } = info;
                if (stack) return `[${timestamp}] [${level}]: ${stack}`;
                return `[${timestamp}] [${level}]: ${message}`;
            })
        );

        const transports = [
            new winston.transports.Console({
                level: 'debug',
                // prettyPrint: true,
                handleExceptions: true,
            }),
            new DailyRotateFile({
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

// console.log(new LoggerConfig('hello'));
// export default logger;
