import { App } from './app.js';
import { Server } from 'socket.io';
import Container from './container.js';
import SocketController from './domain/socket/socket.controller.js';
export const app = new App();
export const io = new Server(app.getHttpServer(), {
    cors: {
        origin: 'http://localhost:4001',
        methods: ['GET', 'POST']
    }
});
app.useCORS();
app.useJSON();
new Container(io).get(SocketController).inizialize();
app.useRoutes();
app.listen(4000);
