"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("domain/room"));
class GetMessages {
    get({ socket, roomId }) {
        if (typeof socket !== 'undefined') {
            {
                socket.join(roomId);
                const messages = room_1.default.get(roomId)?.messages;
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
exports.default = GetMessages;
//# sourceMappingURL=get-messages.js.map