import { Request, Response } from 'express';
import ICreateRoomDataInteractor from './interfaces/createRoomData.interface';
import IGetRoomDataInteractor from './interfaces/getRoomData.interactor';

export default class RoomController {
  private getRoomDataInteractor: IGetRoomDataInteractor;
  private createRoomDataInteractor: ICreateRoomDataInteractor;

  constructor(
    getRoomDataInteractor: IGetRoomDataInteractor,
    createRoomDataInteractor: ICreateRoomDataInteractor
  ) {
    this.getRoomDataInteractor = getRoomDataInteractor;
    this.createRoomDataInteractor = createRoomDataInteractor;
  }

  public getRoomData(req: Request, res: Response) {
    return this.getRoomDataInteractor.getRoomData(req, res);
  }

  public createRoomData(req: Request, res: Response) {
    return this.createRoomDataInteractor.createRoom(req, res);
  }
}
