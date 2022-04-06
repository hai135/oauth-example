import { User } from './model/User';
import 'reflect-metadata';
import {
    Action,
    createExpressServer,
    ForbiddenError,
} from 'routing-controllers';
import { Service } from 'typedi';
import { UserController } from './controller/UserController';
import { TestController } from './controller/TestController';
import { TodoController } from './controller/TodoController';
import { AppDataSource } from './loaders/database';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config/jwt';
// import passport from './config/passport';

@Service()
// creates express app, registers all controller routes and returns you express app instance
export class Application {
    async start() {
        try {
            await AppDataSource.initialize();
            console.log('Connected to database!!!');
        } catch (err) {
            console.log(err);
        }

        const app = createExpressServer({
            // authorizationChecker: (action: Action, roles: any[]) =>
            //     new Promise((res, rej) => {
            //         return res(true);
            //     }),
            currentUserChecker: async (action: Action) => {
                if (action.request.headers['authorization']) {
                    const [_, token] =
                        action.request.headers['authorization'].split(' ');
                    try {
                        const decode = jwt.verify(token, JWT_SECRET, {
                            // ignoreExpiration: true,
                        }) as jwt.JwtPayload;
                        return User.findOneBy({ id: +decode.id });
                    } catch (error) {
                        // return { message: 'Unauthorized' };
                        return error;
                    }
                }
                return new ForbiddenError('Missing token');
            },
            controllers: [TodoController, TestController, UserController], // we specify controllers we want to use
        });
        // app.use(passport.initialize());
        // run express application on port 3001
        app.listen(3001);
    }
}
