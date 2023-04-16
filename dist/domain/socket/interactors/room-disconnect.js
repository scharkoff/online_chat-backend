"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomDisconnect = void 0;
const rooms_type_1 = require("domain/room/rooms.type");
class RoomDisconnect {
    disconnect({ socket }) {
        if (typeof socket !== 'undefined') {
            rooms_type_1.rooms.forEach((value, roomId) => {
                const currentUsers = value.users;
                const updatedUsers = currentUsers.filter((user) => user.socketId !== socket.id);
                if (rooms_type_1.rooms.has(roomId)) {
                    const roomData = rooms_type_1.rooms.get(roomId);
                    if (typeof roomData !== 'undefined') {
                        if (roomData.users.length === 1) {
                            roomData.messages = [];
                        }
                        roomData.users = updatedUsers;
                        rooms_type_1.rooms.set(roomId, roomData);
                    }
                    socket.broadcast.to(roomId).emit('ROOM:UPDATE_USERS', rooms_type_1.rooms.get(roomId)?.users);
                }
            });
        }
        else {
            throw new TypeError('The socket is undefined');
        }
    }
}
exports.RoomDisconnect = RoomDisconnect;
