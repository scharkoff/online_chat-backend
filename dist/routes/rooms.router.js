import { Router } from 'express';
import RoomController from '../domain/room/rooms.controller.js';
import GetRoomDataInteractor from '../domain/room/interactors/getRoomData.interactor.js';
import CreateRoomDataInteractor from '../domain/room/interactors/createRoomData.interactor.js';
const roomsRouter = Router();
const roomController = new RoomController(new GetRoomDataInteractor(), new CreateRoomDataInteractor());
roomsRouter.get('/rooms/:id', roomController.getRoomData.bind(roomController));
roomsRouter.post('/rooms', roomController.createRoomData.bind(roomController));
export default roomsRouter;
