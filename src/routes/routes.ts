import { Router } from 'express';
import RoomsRouter from './rooms.router';
import Container from '../container';
import RoomController from 'domain/room/rooms.controller';

export default class Routes {
  private container: Container;
  private routes: Router[] = [];

  constructor(container: Container) {
    this.container = container;

    this.routes.push(new RoomsRouter(this.container.get<RoomController>(RoomController)).get());
  }

  public get(): Router[] {
    return this.routes;
  }
}
