import { io } from '../../../index';
import { Socket } from 'socket.io';
import { IRoomProps } from 'utils/dto/roomprops';
import { rooms } from '../domain/rooms';
import { IUserDTO } from 'utils/dto/user';
import { IMessageDTO } from 'utils/dto/message';

export const socketController = () => {
  io.on('connection', (socket: Socket) => {
    socket.on('ROOM:JOIN', ({ roomId, userName }: IRoomProps) => {
      socket.join(roomId);

      rooms.get(roomId)?.get('users')?.push({ socketId: socket.id, userName });
      const users: IterableIterator<IUserDTO> | undefined = rooms
        .get(roomId)
        ?.get('users')
        ?.values();

      if (typeof users !== 'undefined') {
        socket.broadcast.to(roomId).emit('ROOM:JOINED', [...users]);
      }
    });

    socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }: IRoomProps) => {
      socket.join(roomId);

      const message: IMessageDTO = { userName, text };

      rooms.get(roomId)?.get('messages')?.push(message);

      socket.broadcast.to(roomId).emit('ROOM:PUSH_NEW_MESSAGE', message);
    });

    socket.on('ROOM:GET_MESSAGES', ({ roomId }: IRoomProps) => {
      socket.join(roomId);

      const messages = rooms.get(roomId)?.get('messages');

      if (typeof messages !== 'undefined') {
        socket.emit('ROOM:GIVE_MESSAGES', messages);
      }
    });

    socket.on('disconnect', () => {
      rooms.forEach((value, roomId) => {
        const usersToFilter: IUserDTO[] = value.get('users') || [];

        if (usersToFilter.filter((user: IUserDTO) => user.socketId !== socket.id)) {
          const updatedUsers: IUserDTO[] = usersToFilter.filter(
            (user: IUserDTO) => user.socketId !== socket.id
          );

          rooms.get(roomId)?.set('users', updatedUsers);

          const users: IterableIterator<IUserDTO> | undefined = rooms
            .get(roomId)
            ?.get('users')
            ?.values();

          if (!rooms.get(roomId)?.get('users')?.length) {
            rooms.get(roomId)?.set('messages', []);
          }

          if (typeof users !== 'undefined') {
            socket.broadcast.to(roomId).emit('ROOM:UPDATE_USERS', [...users]);
          }
        }
      });
    });
  });
};
