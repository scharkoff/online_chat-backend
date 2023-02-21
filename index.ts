import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { rooms } from './src/api/domain/rooms';
import { IUserDTO } from './src/utils/dto/user';
import { IRoomProps } from './src/utils/dto/roomprops';
import { userRouter } from './src/api/routes/rooms';
import { IMessageDTO } from './src/utils/dto/message';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4001',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

app.use(express.json());

app.use(userRouter);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

io.on('connection', (socket: Socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName }: IRoomProps) => {
    socket.join(roomId);

    rooms.get(roomId)?.get('users')?.push({ socketId: socket.id, userName });
    const users: IterableIterator<IUserDTO> | undefined = rooms.get(roomId)?.get('users')?.values();

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

        if (typeof users !== 'undefined') {
          socket.broadcast.to(roomId).emit('ROOM:UPDATE_USERS', [...users]);
        }
      }
    });
  });

  console.log('user connected: ', socket.id);
});

server.listen(4000, () => {
  console.log('Server started on port 4000...');
});
