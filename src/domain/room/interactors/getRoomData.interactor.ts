import { Request, Response } from 'express';
import { Room, rooms } from '../rooms.type';

export class GetRoomDataInteractor {
  public getRoomData(req: Request, res: Response): void {
    try {
      const roomId: string = req.params.id;

      const users = rooms.get(roomId)?.get('users');

      const messages = rooms.get(roomId)?.get('messages');

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
