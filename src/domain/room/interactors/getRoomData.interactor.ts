import { Request, Response } from 'express';
import IGetRoomDataInteractor from '../interfaces/getRoomData.interactor';
import rooms from '..';
import Room from '../interfaces/room.interface';

export default class GetRoomDataInteractor implements IGetRoomDataInteractor {
  public getRoomData(req: Request, res: Response): void {
    try {
      const roomId: string = req.params.id;

      const users = rooms.get(roomId)?.users;

      const messages = rooms.get(roomId)?.messages;

      let roomData: Room = { users: [], messages: [] };

      if (typeof users !== 'undefined' && typeof messages !== 'undefined') {
        roomData = {
          users: [...users],
          messages: [...messages]
        };
      }

      res.status(200).json(roomData);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error
      });
    }
  }
}
