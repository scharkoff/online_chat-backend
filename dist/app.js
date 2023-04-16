"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const container_1 = require("container");
const routes_1 = __importDefault(require("./routes"));
const index_1 = require("index");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.container = new container_1.Container(index_1.io);
        this.routes = routes_1.default;
    }
    useCORS() {
        this.app.use((0, cors_1.default)());
    }
    useJSON() {
        this.app.use(express_1.default.json());
    }
    listen(port) {
        this.server.listen(port, () => {
            console.log('Server started on port 4000...');
        });
    }
    useRoutes() {
        this.routes.forEach((route) => {
            this.app.use(route);
        });
    }
    getHttpServer() {
        return this.server;
    }
    getContainer() {
        return this.container;
    }
}
exports.App = App;
