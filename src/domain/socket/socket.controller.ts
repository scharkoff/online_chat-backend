import { io } from '../../../index';
import { Socket } from 'socket.io';
import { RoomDTO } from 'domain/room/room-dto';
import { rooms } from '../room/rooms.type';
import { User } from 'domain/user/user.types';
import { Message } from 'domain/message/message.type';
import { instanceOfUser } from '../user/user.types';

export const socketController = () => {
  io.on('connection', (socket: Socket) => {
    socket.on('ROOM:JOIN', ({ roomId, userName }: RoomDTO) => {
      socket.join(roomId);

      rooms.get(roomId)?.get('users')?.push({ socketId: socket.id, userName });
      const users = rooms.get(roomId)?.get('users')?.values();

      if (typeof users !== 'undefined') {
        socket.broadcast.to(roomId).emit('ROOM:JOINED', [...users]);
      }
    });

    socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }: RoomDTO) => {
      socket.join(roomId);

      const message: Message = { userName, text };

      rooms.get(roomId)?.get('messages')?.push(message);

      socket.broadcast.to(roomId).emit('ROOM:PUSH_NEW_MESSAGE', message);
    });

    socket.on('ROOM:GET_MESSAGES', ({ roomId }: RoomDTO) => {
      socket.join(roomId);

      const messages = rooms.get(roomId)?.get('messages');

      if (typeof messages !== 'undefined') {
        socket.emit('ROOM:GIVE_MESSAGES', messages);
      }
    });

    socket.on('disconnect', () => {
      rooms.forEach((value, roomId) => {
        const usersToFilter = value.get('users');

        if (instanceOfUser(usersToFilter)) {
          if (usersToFilter.filter((user: User) => user.socketId !== socket.id)) {
            const updatedUsers: User[] = usersToFilter.filter(
              (user: User) => user.socketId !== socket.id
            );

            rooms.get(roomId)?.set('users', updatedUsers);

            const users = rooms.get(roomId)?.get('users')?.values();

            if (!rooms.get(roomId)?.get('users')?.length) {
              rooms.get(roomId)?.set('messages', []);
            }

            if (typeof users !== 'undefined') {
              socket.broadcast.to(roomId).emit('ROOM:UPDATE_USERS', [...users]);
            }
          }
        }
      });
    });
  });
};
