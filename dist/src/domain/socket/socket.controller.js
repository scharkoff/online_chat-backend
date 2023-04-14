"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketController = void 0;
const index_1 = require("../../../index");
const join_1 = require("./interactors/join");
const new_message_1 = require("./interactors/new-message");
const get_messages_1 = require("./interactors/get-messages");
const room_disconnect_1 = require("./interactors/room-disconnect");
class SocketController {
    constructor() {
        this.RoomJoin = new join_1.RoomJoin();
        this.NewMessage = new new_message_1.NewMessage();
        this.GetMessages = new get_messages_1.GetMessages();
        this.RoomDisconnect = new room_disconnect_1.RoomDisconnect();
    }
    inizialize() {
        index_1.io.on('connection', (socket) => {
            socket.on('ROOM:JOIN', ({ roomId, userName }) => {
                this.RoomJoin.join({ socket, roomId, userName });
            });
            socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
                this.NewMessage.NewMessage({ socket, roomId, userName, text });
            });
            socket.on('ROOM:GET_MESSAGES', ({ roomId }) => {
                this.GetMessages.GetMessages({ socket, roomId });
            });
            socket.on('disconnect', () => {
                this.RoomDisconnect.disconnect({ socket });
            });
        });
    }
}
exports.SocketController = SocketController;
