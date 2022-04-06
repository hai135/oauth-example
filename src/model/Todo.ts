import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import { User } from './User';
@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    completed!: string;

    @ManyToOne(() => User, (user) => user.todos)
    user!: User;
}
