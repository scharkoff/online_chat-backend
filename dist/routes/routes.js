"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_router_1 = __importDefault(require("./rooms.router"));
const rooms_controller_1 = __importDefault(require("domain/room/rooms.controller"));
class Routes {
    constructor(container) {
        this.routes = [];
        this.container = container;
        this.routes.push(new rooms_router_1.default(this.container.get(rooms_controller_1.default)).get());
    }
    get() {
        return this.routes;
    }
}
exports.default = Routes;
//# sourceMappingURL=routes.js.map