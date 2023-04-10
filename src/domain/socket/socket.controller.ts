import { io } from '../../../index';
import { Socket } from 'socket.io';
import { RoomDTO } from 'domain/room/room-dto';
import { rooms } from '../room/rooms.type';
import { User } from 'domain/user/user.types';
import { Message } from 'domain/message/message.type';

export const socketController = () => {
  io.on('connection', (socket: Socket) => {
    socket.on('ROOM:JOIN', ({ roomId, userName }: RoomDTO) => {
      socket.join(roomId);

      rooms.get(roomId)?.users?.push({ socketId: socket.id, userName });
      const users = rooms.get(roomId)?.users?.values();

      if (typeof users !== 'undefined') {
        socket.broadcast.to(roomId).emit('ROOM:JOINED', [...users]);
      }
    });

    socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }: RoomDTO) => {
      socket.join(roomId);

      const message: Message = { userName, text };

      rooms.get(roomId)?.messages?.push(message);

      socket.broadcast.to(roomId).emit('ROOM:PUSH_NEW_MESSAGE', message);
    });

    socket.on('ROOM:GET_MESSAGES', ({ roomId }: RoomDTO) => {
      socket.join(roomId);

      const messages = rooms.get(roomId)?.messages;

      if (typeof messages !== 'undefined') {
        socket.emit('ROOM:GIVE_MESSAGES', messages);
      }
    });

    socket.on('disconnect', () => {
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
    });
  });
};
