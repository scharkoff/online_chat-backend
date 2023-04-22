"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_messages_1 = __importDefault(require("./domain/socket/interactors/get-messages"));
const room_join_1 = __importDefault(require("./domain/socket/interactors/room-join"));
const new_message_1 = __importDefault(require("./domain/socket/interactors/new-message"));
const room_disconnect_1 = __importDefault(require("./domain/socket/interactors/room-disconnect"));
const socket_controller_1 = __importDefault(require("./domain/socket/socket.controller"));
const rooms_controller_1 = __importDefault(require("./domain/room/rooms.controller"));
const createRoomData_interactor_1 = __importDefault(require("./domain/room/interactors/createRoomData.interactor"));
const getRoomData_interactor_1 = __importDefault(require("./domain/room/interactors/getRoomData.interactor"));
class Container {
    constructor(io) {
        this.instances = new Map();
        this.instances.set(socket_controller_1.default, new socket_controller_1.default(io, new room_join_1.default(), new new_message_1.default(), new get_messages_1.default(), new room_disconnect_1.default()));
        this.instances.set(rooms_controller_1.default, new rooms_controller_1.default(new getRoomData_interactor_1.default(), new createRoomData_interactor_1.default()));
    }
    get(type) {
        const instance = this.instances.get(type);
        if (!instance) {
            throw new Error(`Instance of ${type.name} not found in container`);
        }
        return instance;
    }
}
exports.default = Container;
//# sourceMappingURL=container.js.map