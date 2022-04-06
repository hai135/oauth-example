import { Service } from 'typedi';
import {
    ILike,
    LessThan,
    LessThanOrEqual,
    MoreThan,
    MoreThanOrEqual,
} from 'typeorm';
import { Todo } from '../model/Todo';
import { User } from '../model/User';

/**
 * 1. paging --> page, limit
 *      todos?limit=2&page=2
 *
 * 2. filter theo field ---> thiet ke input structure
 *
 *
 * 3. orderby theo field
 *
 */

@Service()
export class TodoService {
    async getAll(
        page?: number,
        limit?: number,
        id?: string,
        title?: string,
        completed?: string,
        sort?: string,
        user?: User
    ) {
        const pageOptions: {
            take?: number;
            skip?: number;
        } = {};
        const whereOptions: {
            id?: any;
            title?: any;
            completed?: any;
            user?: any;
        } = { user: { id: user?.id } };
        const sortOptions: {
            id?: any;
            title?: any;
        } = {};
        if (sort) {
            const [idSort, titleSort] = sort.split(',');
            sortOptions.id =
                idSort === 'ASC'
                    ? 'ASC'
                    : idSort === 'DESC'
                    ? 'DESC'
                    : undefined;
            sortOptions.title =
                titleSort === 'ASC'
                    ? 'ASC'
                    : titleSort === 'DESC'
                    ? 'DESC'
                    : undefined;
        }
        let savedTodos: Todo[];
        if (page && limit) {
            pageOptions.take = limit;
            pageOptions.skip = (page - 1) * limit;
        }
        if (id) {
            // eql : e->equal | m->greater | l->less
            const [value, eql] = id.split(',');

            if (eql === 'g') {
                whereOptions.id = MoreThan(+value);
            } else if (eql === 'l') {
                whereOptions.id = LessThan(+value);
            } else if (eql === 'le') {
                whereOptions.id = LessThanOrEqual(+value);
            } else if (eql === 'ge') {
                whereOptions.id = MoreThanOrEqual(+value);
            } else {
                whereOptions.id = +value;
            }
        }
        if (title) {
            whereOptions.title = ILike(`%${title}%`);
        }
        if (completed) {
            whereOptions.completed =
                completed === 'true'
                    ? 'true'
                    : completed === 'false'
                    ? 'false'
                    : undefined;
        }
        savedTodos = await Todo.find({
            ...pageOptions,
            where: whereOptions,
            order: sortOptions,
        });

        // console.log('All photos from the db: ', savedTodos);
        return savedTodos;
    }

    async getById(id: number) {
        const todoRemove = await Todo.findOneBy({
            id: id,
        });
        return todoRemove;
    }

    async createTodo(title: string, completed: string, user: User) {
        const todo = new Todo();
        // console.log(title, completed);
        todo.title = title;
        todo.completed = completed;
        todo.user = user;
        try {
            await Todo.save(todo);
            console.log('Photo has been saved. Photo id is', todo.id);
            return { message: 'successful' };
        } catch {
            return { message: 'failed' };
        }
    }

    async updateTodoById(id: number, title?: string, completed?: string) {
        const todoUpdate = await Todo.findOneBy({
            id: id,
        });
        console.log(todoUpdate);
        try {
            if (todoUpdate) {
                if (title) {
                    todoUpdate.title = title;
                }
                if (completed) {
                    todoUpdate.completed = completed;
                }
                await Todo.save(todoUpdate);
            }
            return { message: 'successful' };
        } catch {
            return { message: 'failed' };
        }
    }

    async deleteTodo(id: number) {
        const todoRemove = await Todo.findOneBy({
            id: id,
        });
        console.log(todoRemove);
        if (todoRemove) {
            await Todo.remove(todoRemove);
            return { message: 'successful' };
        }
        return { message: 'failed' };
    }
}
