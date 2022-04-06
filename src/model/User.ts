import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { Todo } from './Todo';
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    age!: number;

    @Column()
    address!: string;

    // @Column()
    // refreshToken!: string[];

    @OneToMany(() => Todo, (todo) => todo.user)
    todos!: Todo[];
}
