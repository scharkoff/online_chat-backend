import { Message } from 'domain/message/message.type';
import { rooms } from 'domain/room/rooms.type';
import { Socket } from 'socket.io';
import { INewMessageInteractor } from '../interfaces/new-messages.interface';

export interface INewMessageDTO {
  socket: Socket;
  roomId: string;
  userName: string;
  text: string;
}

export class NewMessage implements INewMessageInteractor {
  public add({ socket, roomId, userName, text }: INewMessageDTO): void {
    if (typeof socket !== 'undefined') {
      socket.join(roomId);

      const message: Message = { userName, text };

      rooms.get(roomId)?.messages?.push(message);

      socket.broadcast.to(roomId).emit('ROOM:PUSH_NEW_MESSAGE', message);
    } else {
      throw new TypeError('The socket is undefined');
    }
  }
}
