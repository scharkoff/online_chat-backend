import INewMessageInteractor from '../interfaces/new-messages.interface';
import INewMessageDTO from '../dto/new-messages.dto';
import Message from 'domain/message/interfaces/message.interface';
import rooms from 'domain/room/index';

export default class NewMessage implements INewMessageInteractor {
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
