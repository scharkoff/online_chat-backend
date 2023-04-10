import { Request, Response } from 'express';
import { rooms } from '../rooms.type';
import { User } from 'domain/user/user.types';
import { Message } from 'domain/message/message.type';

export class CreateRoomDataInteractor {
  public createRoom(req: Request, res: Response): void {
    try {
      const { roomId } = req.body;
      if (!rooms.has(roomId)) {
        const users: User[] = [];
        const messages: Message[] = [];

        rooms.set(
          roomId,
          new Map([
            ['users', users],
            ['messages', messages]
          ])
        );
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
