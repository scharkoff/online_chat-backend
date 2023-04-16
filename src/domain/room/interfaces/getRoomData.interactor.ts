import { Request, Response } from 'express';

export default interface IGetRoomDataInteractor {
  getRoomData(req: Request, res: Response): void;
}
