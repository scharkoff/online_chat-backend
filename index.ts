import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { userRouter } from './src/routes/rooms.router';
import { socketController } from './src/domain/socket/socket.controller';

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4001',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

app.use(express.json());

app.use(userRouter);

socketController();

server.listen(4000, () => {
  console.log('Server started on port 4000...');
});
