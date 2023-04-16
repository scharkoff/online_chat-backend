import { Request, Response } from 'express';

export default interface ICreateRoomDataInteractor {
  createRoom(req: Request, res: Response): void;
}
