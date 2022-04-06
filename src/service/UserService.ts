import { Service } from 'typedi';
import {
    ILike,
    LessThan,
    LessThanOrEqual,
    MoreThan,
    MoreThanOrEqual,
} from 'typeorm';
import { User } from './../model/User';

@Service()
export class UserService {
    async getAll() {
        return await User.find();
    }

    async getById(id: number) {}

    async getByEmail(email: string): Promise<User | null> {
        const user = await User.findOneBy({ email });
        return user;
    }

    async updateUserById(id: number, title?: string, completed?: string) {}

    async deleteUser(id: number) {}
}
