import { Router } from 'express';

import { getRoomData } from '../controllers/roomts';
import { createRoom } from '../controllers/roomts';

export const userRouter: Router = Router();

userRouter.get('/rooms/:id', getRoomData);

userRouter.post('/rooms', createRoom);
