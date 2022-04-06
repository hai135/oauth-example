import { User } from './../model/User';
import {
    JsonController,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    QueryParam,
    Authorized,
    CurrentUser,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { TodoService } from '../service/TodoService';
import { CreateTodo } from './../dto/CreateTodo.dto';
import { LoggerConfig } from '../utils/winston';
@JsonController()
@Service()
export class TodoController {
    logger = new LoggerConfig('TodoController');
    constructor(public todoService: TodoService) {}

    // @Inject()
    // TodoService!: TodoService;
    // @Authorized(['c', '2'])
    @Get('/todos')
    getAll(
        @QueryParam('limit') limit: number,
        @QueryParam('page') page: number,
        @QueryParam('id') id: string,
        @QueryParam('title') title: string,
        @QueryParam('completed') completed: string,
        @QueryParam('sort') sort: string,
        @CurrentUser({ required: true }) user: User | object
    ): Promise<any[]> | {} {
        this.logger.logger.info('Get all todos');
        if (user instanceof User) {
            return this.todoService.getAll(
                page,
                limit,
                id,
                title,
                completed,
                sort,
                user
            );
        }
        return user;
    }

    @Get('/todos/:id')
    getOne(@Param('id') id: number) {
        this.logger.logger.info('Get todo id: ' + id);
        return this.todoService.getById(id);
    }

    @Post('/todos')
    post(
        @Body() todo: CreateTodo,
        @CurrentUser({ required: true }) user: User
    ): {} {
        this.logger.logger.info('create todo: ' + JSON.stringify(todo));
        if (user instanceof User) {
            return this.todoService.createTodo(
                todo.title,
                todo.completed,
                user
            );
        }
        return user;
    }

    @Put('/todos/:id')
    put(@Param('id') id: number, @Body() todo: any) {
        this.logger.logger.info('Update todo id: ' + id, JSON.stringify(todo));
        return this.todoService.updateTodoById(id, todo.title, todo.completed);
    }

    @Delete('/todos/:id')
    remove(@Param('id') id: number): {} {
        this.logger.logger.info('Remove todo id: ' + id);
        return this.todoService.deleteTodo(id);
    }
}
