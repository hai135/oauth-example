"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const Todo_1 = require("../model/Todo");
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
let TodoService = class TodoService {
    getAll(page, limit, id, title, completed, sort, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageOptions = {};
            const whereOptions = { user: { id: user === null || user === void 0 ? void 0 : user.id } };
            const sortOptions = {};
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
            let savedTodos;
            if (page && limit) {
                pageOptions.take = limit;
                pageOptions.skip = (page - 1) * limit;
            }
            if (id) {
                // eql : e->equal | m->greater | l->less
                const [value, eql] = id.split(',');
                if (eql === 'g') {
                    whereOptions.id = (0, typeorm_1.MoreThan)(+value);
                }
                else if (eql === 'l') {
                    whereOptions.id = (0, typeorm_1.LessThan)(+value);
                }
                else if (eql === 'le') {
                    whereOptions.id = (0, typeorm_1.LessThanOrEqual)(+value);
                }
                else if (eql === 'ge') {
                    whereOptions.id = (0, typeorm_1.MoreThanOrEqual)(+value);
                }
                else {
                    whereOptions.id = +value;
                }
            }
            if (title) {
                whereOptions.title = (0, typeorm_1.ILike)(`%${title}%`);
            }
            if (completed) {
                whereOptions.completed =
                    completed === 'true'
                        ? 'true'
                        : completed === 'false'
                            ? 'false'
                            : undefined;
            }
            savedTodos = yield Todo_1.Todo.find(Object.assign(Object.assign({}, pageOptions), { where: whereOptions, order: sortOptions }));
            // console.log('All photos from the db: ', savedTodos);
            return savedTodos;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoRemove = yield Todo_1.Todo.findOneBy({
                id: id,
            });
            return todoRemove;
        });
    }
    createTodo(title, completed, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = new Todo_1.Todo();
            // console.log(title, completed);
            todo.title = title;
            todo.completed = completed;
            todo.user = user;
            try {
                yield Todo_1.Todo.save(todo);
                console.log('Photo has been saved. Photo id is', todo.id);
                return { message: 'successful' };
            }
            catch (_a) {
                return { message: 'failed' };
            }
        });
    }
    updateTodoById(id, title, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoUpdate = yield Todo_1.Todo.findOneBy({
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
                    yield Todo_1.Todo.save(todoUpdate);
                }
                return { message: 'successful' };
            }
            catch (_a) {
                return { message: 'failed' };
            }
        });
    }
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoRemove = yield Todo_1.Todo.findOneBy({
                id: id,
            });
            console.log(todoRemove);
            if (todoRemove) {
                yield Todo_1.Todo.remove(todoRemove);
                return { message: 'successful' };
            }
            return { message: 'failed' };
        });
    }
};
TodoService = __decorate([
    (0, typedi_1.Service)()
], TodoService);
exports.TodoService = TodoService;
