import { Router } from 'express';
import { io } from '../index.js';
import RoomController from '../domain/room/rooms.controller.js';
import Container from 'container.js';
const roomsRouter = Router();
const roomController = new Container(io).get(RoomController);
roomsRouter.get('/rooms/:id', roomController.getRoomData.bind(roomController));
roomsRouter.post('/rooms', roomController.createRoomData.bind(roomController));
export default roomsRouter;
