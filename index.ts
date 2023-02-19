import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { rooms } from './src/data/rooms';
import { IUserDTO } from './src/dto/user';
import { IMessageDTO } from './src/dto/message';
import { IRoomDataDTO } from './src/dto/roomdata';
import { IRoomProps } from './src/dto/roomprops';

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

app.get('/rooms/:id', (req: Request, res: Response) => {
  const roomId: string = req.params.id;

  const users = rooms.has(roomId) ? rooms.get(roomId)?.get('users')?.values() || [] : [];

  const messages = rooms.get(roomId)?.get('messages')?.values() || [];

  const roomData: IRoomDataDTO = {
    users: [...users],
    messages: [...messages]
  };

  return res.json(roomData);
});

app.post('/rooms', (req: Request, res: Response) => {
  const { roomId } = req.body;
  if (!rooms.has(roomId)) {
    const users: IUserDTO[] = [];
    const messages: IMessageDTO[] = [];

    rooms.set(
      roomId,
      new Map([
        ['users', users],
        ['messages', messages]
      ])
    );
  }

  return res.status(200).send('Joined successful');
});

io.on('connection', (socket: Socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName }: IRoomProps) => {
    socket.join(roomId);

    rooms.get(roomId)?.get('users')?.push({ socketId: socket.id, userName });
    const users = rooms.get(roomId)?.get('users')?.values() || [];

    socket.broadcast.to(roomId).emit('ROOM:JOINED', [...users]);
    console.log('rooms ', rooms);
  });

  socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }: IRoomProps) => {
    console.log(roomId, userName, text);
    socket.join(roomId);

    rooms.get(roomId)?.get('messages')?.push({ userName, text });
    console.log('messages ', rooms.get(roomId)?.get('messages'));

    socket.broadcast.to(roomId).emit('ROOM:PUSH_NEW_MESSAGE', { userName, text });
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      const usersToFilter: IUserDTO[] = value.get('users') || [];

      if (usersToFilter.filter((user: IUserDTO) => user.socketId !== socket.id)) {
        const updatedUsers: IUserDTO[] = usersToFilter.filter(
          (user: IUserDTO) => user.socketId !== socket.id
        );

        rooms.get(roomId)?.set('users', updatedUsers);
        const users = rooms.get(roomId)?.get('users')?.values() || [];

        socket.broadcast.to(roomId).emit('ROOM:UPDATE_USERS', [...users]);
      }
    });
  });

  console.log('user connected: ', socket.id);
});

server.listen(4000, () => {
  console.log('Server started on port 4000...');
});
