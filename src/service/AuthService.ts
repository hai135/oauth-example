import { BadRequestError } from 'routing-controllers';
import { UserService } from './UserService';
import { Service } from 'typedi';
import { User } from '../model/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';
@Service()
export class AuthService {
    constructor(public userService: UserService) {}

    async generateToken(payload: any) {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: 30,
        });
    }

    async signup(
        name: string,
        email: string,
        password: string,
        age: number | undefined,
        address: string
    ) {
        //check user existed
        // const userCheck = await this.userService.getByEmail(email);
        // if (userCheck) {
        //     return new BadRequestError('Email has existed');
        // } else {
        const pwd = await bcrypt.hash(password, 8);
        const user = await User.save({
            name,
            email,
            password: pwd,
            age,
            address,
        });
        const token = await this.generateToken({ id: user.id.toString() });
        const rfToken = await jwt.sign({ id: user.id.toString() }, JWT_SECRET);
        return { user, token, rfToken };
        // }
    }

    async signin(email: string, password: string) {
        const userCheck = await this.userService.getByEmail(email);
        if (!userCheck) {
            return new BadRequestError("User isn't exist");
            // return null;
        }
        const isMatch = await bcrypt.compare(password, userCheck.password);
        if (!isMatch) {
            return new BadRequestError('Unable to login');
        }
        const token = await this.generateToken({ id: userCheck.id.toString() });
        const rfToken = await jwt.sign(
            { id: userCheck.id.toString() },
            JWT_SECRET
        );
        return { user: userCheck, token, rfToken };
    }

    async refreshToken(refreshToken: string) {
        const payload = jwt.verify(refreshToken, JWT_SECRET) as jwt.JwtPayload;
        console.log(payload);
        delete payload.iat;
        const newToken = await this.generateToken(payload);
        return { token: newToken };
    }
}
