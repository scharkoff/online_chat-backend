"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("domain/room"));
class RoomJoin {
    join({ socket, roomId, userName }) {
        if (typeof socket !== 'undefined') {
            socket.join(roomId);
            room_1.default.get(roomId)?.users?.push({ socketId: socket.id, userName });
            const users = room_1.default.get(roomId)?.users?.values();
            if (typeof users !== 'undefined') {
                socket.broadcast.to(roomId).emit('ROOM:JOINED', [...users]);
            }
        }
        else {
            throw new TypeError('The socket is undefined');
        }
    }
}
exports.default = RoomJoin;
//# sourceMappingURL=room-join.js.map