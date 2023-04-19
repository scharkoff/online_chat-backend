import { Router } from 'express';
import { Server } from 'socket.io';
import RoomsRouter from './rooms.router.js';
import Container from '../container.js';
import RoomController from '../domain/room/rooms.controller.js';

export default class Routes {
  private io: Server;
  private routes: Router[] = [];

  constructor(io: Server) {
    this.io = io;

    this.routes.push(
      new RoomsRouter(new Container(this.io).get<RoomController>(RoomController)).get()
    );
  }

  public get(): Router[] {
    return this.routes;
  }
}
