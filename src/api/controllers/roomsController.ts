import { Request, Response } from 'express';

import { rooms } from '../domain/rooms';
import { IRoomDataDTO } from '../../utils/dto/roomdata';
import { IUserDTO } from '../../utils/dto/user';
import { IMessageDTO } from '../../utils/dto/message';

export function getRoomData(req: Request, res: Response): void {
  try {
    const roomId: string = req.params.id;

    const users: IterableIterator<IUserDTO> | undefined = rooms.get(roomId)?.get('users')?.values();

    const messages: IterableIterator<IMessageDTO> | undefined = rooms
      .get(roomId)
      ?.get('messages')
      ?.values();

    let roomData: IRoomDataDTO = { users: [], messages: [] };

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

export function createRoom(req: Request, res: Response): void {
  try {
    const { roomId } = req.body;
    if (!rooms.has(roomId)) {
      const users: IUserDTO[] = [];
      const messages: IMessageDTO[] = [];

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
