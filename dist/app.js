"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: 'http://localhost:4001',
                methods: ['GET', 'POST']
            }
        });
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    listen(port) {
        this.server.listen(port, () => {
            console.log(`Server started on port ${port}...`);
        });
    }
    useRoutes(routes) {
        routes.forEach((route) => {
            this.app.use(route);
        });
    }
    getIo() {
        return this.io;
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map