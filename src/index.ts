import { App } from 'app';
import { Server } from 'socket.io';
import SocketController from 'domain/socket/socket.controller';
import Container from 'container';

export const app = new App();

export const io = new Server(app.getHttpServer(), {
  cors: {
    origin: 'http://localhost:4001',
    methods: ['GET', 'POST']
  }
});

app.useCORS();

app.useJSON();

new Container(io).get<SocketController>(SocketController).inizialize();

app.useRoutes();

app.listen(4000);
