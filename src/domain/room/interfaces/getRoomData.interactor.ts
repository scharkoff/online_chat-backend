import { Request, Response } from 'express';

export interface IGetRoomDataInteractor {
  getRoomData(req: Request, res: Response): void;
}
