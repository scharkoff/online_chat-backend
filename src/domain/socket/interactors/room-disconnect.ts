import { rooms } from 'domain/room/rooms.type';
import { User } from 'domain/user/user.types';
import { Socket } from 'socket.io';
import { IRoomDisconnectInteractor } from '../interfaces/room-disconnect.interface';

export interface IRoomDisconnectDTO {
  socket: Socket;
}

export class RoomDisconnect implements IRoomDisconnectInteractor {
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
