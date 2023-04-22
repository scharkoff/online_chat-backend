import IGetMessagesInteractor from '../interfaces/get-messages.interface';
import IGetMessagesDTO from '../dto/get-messages.dto';
import rooms from 'domain/room/index';

export default class GetMessages implements IGetMessagesInteractor {
  public get({ socket, roomId }: IGetMessagesDTO): void {
    if (typeof socket !== 'undefined') {
      {
        socket.join(roomId);

        const messages = rooms.get(roomId)?.messages;

        if (typeof messages !== 'undefined') {
          socket.emit('ROOM:GIVE_MESSAGES', messages);
        }
      }
    } else {
      throw new TypeError('The socket is undefined');
    }
  }
}
