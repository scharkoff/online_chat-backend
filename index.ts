import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { rooms } from './src/data/rooms';
import { IDataProps } from './types';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4001',
    methods: ['GET', 'POST', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

app.get(
  '/rooms/:id',
  (req: express.Request, res: express.Response) => {
    const roomId = req.params.id || '';

    const users = rooms.has(roomId)
      ? rooms.get(roomId)?.get('users')?.values() || []
      : [];

    const messages =
      rooms.get(roomId)?.get('messages')?.values() || [];

    const obj = {
      users: [...users],
      messages: [...messages]
    };

    return res.json(obj);
  }
);

app.post('/rooms', (req: express.Request, res: express.Response) => {
  const { roomId } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', new Map()]
      ])
    );
  }

  return res.status(200).send('Joined successful');
});

io.on('connection', (socket: Socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName }: IDataProps) => {
    socket.join(roomId);
    rooms.get(roomId)?.get('users')?.set(socket.id, userName);

    const users = rooms.get(roomId)?.get('users')?.values() || [];

    socket.broadcast.to(roomId).emit('ROOM:JOINED', [...users]);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users')?.delete(socket.id)) {
        const users = rooms.get(roomId)?.get('users')?.values() || [];

        socket.broadcast
          .to(roomId)
          .emit('ROOM:UPDATE_USERS', [...users]);
      }
    });
  });

  console.log('user connected: ', socket.id);
});

server.listen(4000, () => {
  console.log('Server started on port 4000...');
});
