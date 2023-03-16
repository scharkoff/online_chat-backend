import { Router } from 'express';

import { getRoomData } from '../controllers/roomsController';
import { createRoom } from '../controllers/roomsController';

export const userRouter: Router = Router();

userRouter.get('/rooms/:id', getRoomData);

userRouter.post('/rooms', createRoom);
