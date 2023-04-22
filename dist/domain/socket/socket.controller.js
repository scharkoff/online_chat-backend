export default class SocketController {
    constructor(io, RoomJoin, NewMessage, GetMessages, RoomDisconnect) {
        this.io = io;
        this.roomJoin = RoomJoin;
        this.newMessage = NewMessage;
        this.getMessages = GetMessages;
        this.roomDisconnect = RoomDisconnect;
    }
    inizialize() {
        this.io.on('connection', (socket) => {
            socket.on('ROOM:JOIN', ({ roomId, userName }) => {
                this.roomJoin.join({ socket, roomId, userName });
            });
            socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
                this.newMessage.add({ socket, roomId, userName, text });
            });
            socket.on('ROOM:GET_MESSAGES', ({ roomId }) => {
                this.getMessages.get({ socket, roomId });
            });
            socket.on('disconnect', () => {
                this.roomDisconnect.disconnect({ socket });
            });
        });
    }
}
//# sourceMappingURL=socket.controller.js.map