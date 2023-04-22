import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import Container from './container.js';
import SocketController from './domain/socket/socket.controller.js';
export class App {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
                origin: 'http://localhost:4001',
                methods: ['GET', 'POST']
            }
        });
        this.app.use(cors());
        this.app.use(express.json());
    }
    listen(port) {
        this.server.listen(port, () => {
            console.log(`Server started on port ${port}...`);
        });
    }
    useRoutes(routes) {
        routes.forEach((route) => {
            this.app.use(route);
        });
    }
    useSocket() {
        new Container(this.io).get(SocketController).inizialize();
    }
    getIo() {
        return this.io;
    }
}
//# sourceMappingURL=app.js.map