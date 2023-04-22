"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("domain/room"));
class RoomDisconnect {
    disconnect({ socket }) {
        if (typeof socket !== 'undefined') {
            room_1.default.forEach((value, roomId) => {
                const currentUsers = value.users;
                const updatedUsers = currentUsers.filter((user) => user.socketId !== socket.id);
                if (room_1.default.has(roomId)) {
                    const roomData = room_1.default.get(roomId);
                    if (typeof roomData !== 'undefined') {
                        if (roomData.users.length === 1) {
                            roomData.messages = [];
                        }
                        roomData.users = updatedUsers;
                        room_1.default.set(roomId, roomData);
                    }
                    socket.broadcast.to(roomId).emit('ROOM:UPDATE_USERS', room_1.default.get(roomId)?.users);
                }
            });
        }
        else {
            throw new TypeError('The socket is undefined');
        }
    }
}
exports.default = RoomDisconnect;
//# sourceMappingURL=room-disconnect.js.map