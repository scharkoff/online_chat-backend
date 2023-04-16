import { Request, Response } from 'express';

export interface ICreateRoomDataInteractor {
  createRoom(req: Request, res: Response): void;
}
