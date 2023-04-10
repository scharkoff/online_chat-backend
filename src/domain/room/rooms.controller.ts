import { Request, Response } from 'express';
import { GetRoomDataInteractor } from './interactors/getRoomData.interactor';
import { CreateRoomDataInteractor } from './interactors/createRoomData.interactor';

export class RoomContoller {
  private getRoomDataInteractor: GetRoomDataInteractor = new GetRoomDataInteractor();
  private createRoomDataInteractor: CreateRoomDataInteractor = new CreateRoomDataInteractor();

  getRoomData(req: Request, res: Response) {
    return this.getRoomDataInteractor.getRoomData(req, res);
  }

  createRoomData(req: Request, res: Response) {
    return this.createRoomDataInteractor.createRoom(req, res);
  }
}
