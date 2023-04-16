import { Router } from 'express';
import { io } from 'index';
import RoomController from '../domain/room/rooms.controller';
import Container from 'container';

const roomsRouter: Router = Router();

const roomController = new Container(io).get<RoomController>(RoomController);

roomsRouter.get('/rooms/:id', roomController.getRoomData.bind(roomController));

roomsRouter.post('/rooms', roomController.createRoomData.bind(roomController));

export default roomsRouter;
