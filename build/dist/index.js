"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const app_1 = require("./app");
(0, routing_controllers_1.useContainer)(typedi_1.Container);
const app = typedi_1.Container.get(app_1.Application);
app.start();
