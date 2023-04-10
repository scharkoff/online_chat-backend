import { Router } from 'express';
import { RoomContoller } from '../domain/room/rooms.controller';

export const userRouter: Router = Router();

const roomContoller = new RoomContoller();

userRouter.get('/rooms/:id', roomContoller.getRoomData.bind(roomContoller));

userRouter.post('/rooms', roomContoller.createRoomData.bind(roomContoller));
