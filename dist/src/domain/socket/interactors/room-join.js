"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomJoin = void 0;
const rooms_type_1 = require("domain/room/rooms.type");
class RoomJoin {
    join({ socket, roomId, userName }) {
        if (typeof socket !== 'undefined') {
            socket.join(roomId);
            rooms_type_1.rooms.get(roomId)?.users?.push({ socketId: socket.id, userName });
            const users = rooms_type_1.rooms.get(roomId)?.users?.values();
            if (typeof users !== 'undefined') {
                socket.broadcast.to(roomId).emit('ROOM:JOINED', [...users]);
            }
        }
        else {
            throw new TypeError('The socket is undefined');
        }
    }
}
exports.RoomJoin = RoomJoin;
