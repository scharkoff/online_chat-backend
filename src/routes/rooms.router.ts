import { Router } from 'express';
import RoomController from '../domain/room/rooms.controller.js';

export default class RoomsRouter {
  private roomsRouter: Router = Router();

  private roomController: RoomController;

  constructor(roomController: RoomController) {
    this.roomController = roomController;

    this.roomsRouter.get('/rooms/:id', this.roomController.getRoomData.bind(this.roomController));
    this.roomsRouter.post('/rooms', this.roomController.createRoomData.bind(this.roomController));
  }

  public get(): Router {
    return this.roomsRouter;
  }
}
