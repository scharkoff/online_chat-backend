"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMessages = void 0;
const rooms_type_1 = require("domain/room/rooms.type");
class GetMessages {
    GetMessages({ socket, roomId }) {
        if (typeof socket !== 'undefined') {
            {
                socket.join(roomId);
                const messages = rooms_type_1.rooms.get(roomId)?.messages;
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
exports.GetMessages = GetMessages;
