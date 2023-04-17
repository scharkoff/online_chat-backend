import User from '../../../domain/user/interfaces/user.interface.js';
import IRoomDisconnectInteractor from '../interfaces/room-disconnect.interface.js';
import IRoomDisconnectDTO from '../dto/room-disconnect.dto.js';
import rooms from '../../../domain/room/index.js';

export default class RoomDisconnect implements IRoomDisconnectInteractor {
  public disconnect({ socket }: IRoomDisconnectDTO): void {
    if (typeof socket !== 'undefined') {
      rooms.forEach((value, roomId) => {
        const currentUsers = value.users;

        const updatedUsers: User[] = currentUsers.filter(
          (user: User) => user.socketId !== socket.id
        );

        if (rooms.has(roomId)) {
          const roomData = rooms.get(roomId);

          if (typeof roomData !== 'undefined') {
            if (roomData.users.length === 1) {
              roomData.messages = [];
            }

            roomData.users = updatedUsers;
            rooms.set(roomId, roomData);
          }

          socket.broadcast.to(roomId).emit('ROOM:UPDATE_USERS', rooms.get(roomId)?.users);
        }
      });
    } else {
      throw new TypeError('The socket is undefined');
    }
  }
}
