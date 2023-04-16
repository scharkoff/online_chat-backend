import { Request, Response } from 'express';
import ICreateRoomDataInteractor from '../interfaces/createRoomData.interface';
import User from 'domain/user/interfaces/user.interface';
import Message from 'domain/message/interfaces/message.interface';
import rooms from '..';

export default class CreateRoomDataInteractor implements ICreateRoomDataInteractor {
  public createRoom(req: Request, res: Response): void {
    try {
      const { roomId } = req.body;
      if (!rooms.has(roomId)) {
        const users: User[] = [];
        const messages: Message[] = [];

        rooms.set(roomId, { users, messages });
      }

      res.status(200).send({
        status: 'success'
      });
    } catch (error) {
      res.status(500).send({
        status: 'error',
        message: error
      });
    }
  }
}
