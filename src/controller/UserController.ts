import {
    JsonController,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    UseBefore,
    Req,
    HttpError,
} from 'routing-controllers';
import { Request } from 'express';
import { Service } from 'typedi';
import { UserService } from './../service/UserService';
import { AuthService } from './../service/AuthService';
import { LoggerConfig } from '../utils/winston';
import passport from './../config/passport';
import { JWT_SECRET } from '../config/jwt';
import * as jwt from 'jsonwebtoken';
@JsonController()
@Service()
export class UserController {
    logger = new LoggerConfig('UserController');
    constructor(
        public userService: UserService,
        public authService: AuthService
    ) {}
    // get all users
    @Get('/users')
    getAll() {
        return this.userService.getAll();
    }

    @Get('/users/:id')
    getOne(@Param('id') id: number) {}

    // register / create user
    @Post('/users')
    async register(@Body() user: any) {
        const { name, email, password, age, address } = user;
        const existUser = await this.userService.getByEmail(email);
        if (!existUser) {
            return this.authService.signup(name, email, password, age, address);
        }
        return new HttpError(409, 'User already exists');
    }

    @Post('/users/login')
    @UseBefore(
        passport.authenticate(
            'local',
            {
                failureRedirect: '/login',
                session: false,
            },
            (a, b, c, d) => {
                console.log(a);
                console.log(b);
                console.log(c);
                console.log(d);
            }
        )
    )
    login(@Body() user: any) {
        console.log(user);
        return this.authService.signin(user.email, user.password);
    }

    @Post('/users/refresh-token')
    refreshToken(@Body() token: any) {
        return this.authService.refreshToken(token.token);
    }

    @Get('/users/logout')
    logout() {}

    //update profile
    @Put('/users/:id')
    put(@Param('id') id: number, @Body() user: any) {}

    @Delete('/users/:id')
    remove(@Param('id') id: number) {}

    @Get('/users/auth/google')
    @UseBefore(
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    )
    google() {}

    @Get('/users/auth/google/callback')
    @UseBefore(
        passport.authenticate('google', {
            failureRedirect: '/login',
            session: false,
        })
    )
    async googleCallback(@Req() request: Request) {
        const u = request.user as any;
        const user = await this.userService.getByEmail(u._json.email);
        const token = await this.authService.generateToken({
            id: user?.id.toString(),
        });
        const rfToken = await jwt.sign({ id: user?.id.toString() }, JWT_SECRET);
        return { token, rfToken };
    }
}
