import rooms from '../../../domain/room/index.js';
export default class GetMessages {
    get({ socket, roomId }) {
        if (typeof socket !== 'undefined') {
            {
                socket.join(roomId);
                const messages = rooms.get(roomId)?.messages;
                if (typeof messages !== 'undefined') {
                    socket.emit('ROOM:GIVE_MESSAGES', messages);
                }
            }
        }
        else {
            throw new TypeError('The socket is undefined');
        }
    }
}
