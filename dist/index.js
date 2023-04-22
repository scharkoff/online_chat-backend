"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const socket_controller_1 = __importDefault(require("domain/socket/socket.controller"));
const app_1 = __importDefault(require("./app"));
const routes_1 = __importDefault(require("./routes/routes"));
const container_1 = __importDefault(require("container"));
exports.app = new app_1.default();
const container = new container_1.default(exports.app.getIo());
container.get(socket_controller_1.default).inizialize();
exports.app.useRoutes(new routes_1.default(container).get());
exports.app.listen(4000);
//# sourceMappingURL=index.js.map