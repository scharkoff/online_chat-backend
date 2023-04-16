"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketController = void 0;
class SocketController {
    constructor(io, RoomJoin, NewMessage, GetMessages, RoomDisconnect) {
        this.io = io;
        this.RoomJoin = RoomJoin;
        this.NewMessage = NewMessage;
        this.GetMessages = GetMessages;
        this.RoomDisconnect = RoomDisconnect;
    }
    inizialize() {
        this.io.on('connection', (socket) => {
            socket.on('ROOM:JOIN', ({ roomId, userName }) => {
                this.RoomJoin.join({ socket, roomId, userName });
            });
            socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
                this.NewMessage.add({ socket, roomId, userName, text });
            });
            socket.on('ROOM:GET_MESSAGES', ({ roomId }) => {
                this.GetMessages.get({ socket, roomId });
            });
            socket.on('disconnect', () => {
                this.RoomDisconnect.disconnect({ socket });
            });
        });
    }
}
exports.SocketController = SocketController;
