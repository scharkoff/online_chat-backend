import { App } from 'app';
import { Container } from 'container';
import { SocketController } from 'domain/socket/socket.controller';
import { Server } from 'socket.io';

export const app = new App();

export const io = new Server(app.getHttpServer(), {
  cors: {
    origin: 'http://localhost:4001',
    methods: ['GET', 'POST']
  }
});

app.useCORS();

app.useJSON();

const socketController = new Container(io).get<SocketController>(SocketController);
socketController.inizialize();

app.useRoutes();

app.listen(4000);
