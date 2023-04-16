"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const get_messages_1 = require("domain/socket/interactors/get-messages");
const room_join_1 = require("domain/socket/interactors/room-join");
const new_message_1 = require("domain/socket/interactors/new-message");
const room_disconnect_1 = require("domain/socket/interactors/room-disconnect");
const socket_controller_1 = require("domain/socket/socket.controller");
const rooms_controller_1 = require("domain/room/rooms.controller");
const createRoomData_interactor_1 = require("domain/room/interactors/createRoomData.interactor");
const getRoomData_interactor_1 = require("domain/room/interactors/getRoomData.interactor");
class Container {
    constructor(io) {
        this.instances = new Map();
        this.instances.set(socket_controller_1.SocketController, new socket_controller_1.SocketController(io, new room_join_1.RoomJoin(), new new_message_1.NewMessage(), new get_messages_1.GetMessages(), new room_disconnect_1.RoomDisconnect()));
        this.instances.set(rooms_controller_1.RoomController, new rooms_controller_1.RoomController(new getRoomData_interactor_1.GetRoomDataInteractor(), new createRoomData_interactor_1.CreateRoomDataInteractor()));
    }
    get(type) {
        const instance = this.instances.get(type);
        if (!instance) {
            throw new Error(`Instance of ${type.name} not found in container`);
        }
        return instance;
    }
}
exports.Container = Container;
