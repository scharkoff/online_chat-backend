import rooms from '../../../domain/room/index.js';
export default class NewMessage {
    add({ socket, roomId, userName, text }) {
        if (typeof socket !== 'undefined') {
            socket.join(roomId);
            const message = { userName, text };
            rooms.get(roomId)?.messages?.push(message);
            socket.broadcast.to(roomId).emit('ROOM:PUSH_NEW_MESSAGE', message);
        }
        else {
            throw new TypeError('The socket is undefined');
        }
    }
}
