"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("domain/room"));
class NewMessage {
    add({ socket, roomId, userName, text }) {
        if (typeof socket !== 'undefined') {
            socket.join(roomId);
            const message = { userName, text };
            room_1.default.get(roomId)?.messages?.push(message);
            socket.broadcast.to(roomId).emit('ROOM:PUSH_NEW_MESSAGE', message);
        }
        else {
            throw new TypeError('The socket is undefined');
        }
    }
}
exports.default = NewMessage;
//# sourceMappingURL=new-message.js.map