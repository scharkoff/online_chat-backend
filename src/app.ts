import express, { Router } from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import Container from './container.js';
import SocketController from './domain/socket/socket.controller.js';

export class App {
  private app = express();
  private server = http.createServer(this.app);
  private io = new Server(this.server, {
    cors: {
      origin: 'http://localhost:4001',
      methods: ['GET', 'POST']
    }
  });

  constructor() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  public listen(port: number) {
    this.server.listen(port, () => {
      console.log(`Server started on port ${port}...`);
    });
  }

  public useRoutes(routes: Router[]) {
    routes.forEach((route: Router) => {
      this.app.use(route);
    });
  }

  public useSocket() {
    new Container(this.io).get<SocketController>(SocketController).inizialize();
  }

  public getIo(): Server {
    return this.io;
  }
}
