"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = void 0;
const app_1 = require("app");
const container_1 = require("container");
const socket_controller_1 = require("domain/socket/socket.controller");
const socket_io_1 = require("socket.io");
exports.app = new app_1.App();
exports.io = new socket_io_1.Server(exports.app.getHttpServer(), {
    cors: {
        origin: 'http://localhost:4001',
        methods: ['GET', 'POST']
    }
});
exports.app.useCORS();
exports.app.useJSON();
exports.app.useRoutes();
new container_1.Container(exports.io).get(socket_controller_1.SocketController).inizialize();
exports.app.listen(4444);
