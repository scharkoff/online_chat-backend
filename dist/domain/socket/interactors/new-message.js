"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewMessage = void 0;
const rooms_type_1 = require("domain/room/rooms.type");
class NewMessage {
    add({ socket, roomId, userName, text }) {
        if (typeof socket !== 'undefined') {
            socket.join(roomId);
            const message = { userName, text };
            rooms_type_1.rooms.get(roomId)?.messages?.push(message);
            socket.broadcast.to(roomId).emit('ROOM:PUSH_NEW_MESSAGE', message);
        }
        else {
            throw new TypeError('The socket is undefined');
        }
    }
}
exports.NewMessage = NewMessage;
