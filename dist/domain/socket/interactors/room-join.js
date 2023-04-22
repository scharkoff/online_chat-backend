import rooms from '../../../domain/room/index.js';
export default class RoomJoin {
    join({ socket, roomId, userName }) {
        if (typeof socket !== 'undefined') {
            socket.join(roomId);
            rooms.get(roomId)?.users?.push({ socketId: socket.id, userName });
            const users = rooms.get(roomId)?.users?.values();
            if (typeof users !== 'undefined') {
                socket.broadcast.to(roomId).emit('ROOM:JOINED', [...users]);
            }
        }
        else {
            throw new TypeError('The socket is undefined');
        }
    }
}
//# sourceMappingURL=room-join.js.map