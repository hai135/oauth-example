"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const User_1 = require("./../model/User");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const TodoService_1 = require("../service/TodoService");
const CreateTodo_dto_1 = require("./../dto/CreateTodo.dto");
const winston_1 = require("../utils/winston");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
        this.logger = new winston_1.LoggerConfig('TodoController');
    }
    // @Inject()
    // TodoService!: TodoService;
    // @Authorized(['c', '2'])
    getAll(limit, page, id, title, completed, sort, user) {
        this.logger.logger.info('Get all todos');
        return this.todoService.getAll(page, limit, id, title, completed, sort, user);
    }
    getOne(id) {
        this.logger.logger.info('Get todo id: ' + id);
        return this.todoService.getById(id);
    }
    post(todo, user) {
        this.logger.logger.info('create todo: ' + JSON.stringify(todo));
        return this.todoService.createTodo(todo.title, todo.completed, user);
    }
    put(id, todo) {
        this.logger.logger.info('Update todo id: ' + id, JSON.stringify(todo));
        return this.todoService.updateTodoById(id, todo.title, todo.completed);
    }
    remove(id) {
        this.logger.logger.info('Remove todo id: ' + id);
        return this.todoService.deleteTodo(id);
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/todos'),
    __param(0, (0, routing_controllers_1.QueryParam)('limit')),
    __param(1, (0, routing_controllers_1.QueryParam)('page')),
    __param(2, (0, routing_controllers_1.QueryParam)('id')),
    __param(3, (0, routing_controllers_1.QueryParam)('title')),
    __param(4, (0, routing_controllers_1.QueryParam)('completed')),
    __param(5, (0, routing_controllers_1.QueryParam)('sort')),
    __param(6, (0, routing_controllers_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String, User_1.User]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)('/todos/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "getOne", null);
__decorate([
    (0, routing_controllers_1.Post)('/todos'),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTodo_dto_1.CreateTodo,
        User_1.User]),
    __metadata("design:returntype", Object)
], TodoController.prototype, "post", null);
__decorate([
    (0, routing_controllers_1.Put)('/todos/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "put", null);
__decorate([
    (0, routing_controllers_1.Delete)('/todos/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], TodoController.prototype, "remove", null);
TodoController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [TodoService_1.TodoService])
], TodoController);
exports.TodoController = TodoController;
