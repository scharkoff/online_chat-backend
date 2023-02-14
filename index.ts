import express, { json } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:4001', methods: ['GET', 'POST', 'DELETE'] }
});

app.use(cors());

app.post('/rooms', (req: express.Request, res: express.Response) => {
  console.log(req.body);
  return res.send('Вернул комнаты');
});

io.on('connection', (socket: Socket) => {
  console.log('user connected: ', socket.id);
});

io.on('disconnect', (socket: Socket) => {
  console.log(socket.id, ' has disconnect');
});

server.listen(4000, () => {
  console.log('Server started on port 4000...');
});
