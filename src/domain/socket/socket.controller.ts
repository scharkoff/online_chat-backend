import { Server, Socket } from 'socket.io';
import IRoomJoinDTO from './dto/room-join.dto';
import INewMessageDTO from './dto/new-messages.dto';
import IRoomJoinInteractor from './interfaces/join.interface';
import INewMessageInteractor from './interfaces/new-messages.interface';
import IGetMessagesInteractor from './interfaces/get-messages.interface';
import IRoomDisconnectInteractor from './interfaces/room-disconnect.interface';
import IGetMessagesDTO from './dto/get-messages.dto';

export default class SocketController {
  private roomJoin: IRoomJoinInteractor;
  private newMessage: INewMessageInteractor;
  private getMessages: IGetMessagesInteractor;
  private roomDisconnect: IRoomDisconnectInteractor;

  private io: Server;

  constructor(
    io: Server,
    RoomJoin: IRoomJoinInteractor,
    NewMessage: INewMessageInteractor,
    GetMessages: IGetMessagesInteractor,
    RoomDisconnect: IRoomDisconnectInteractor
  ) {
    this.io = io;
    this.roomJoin = RoomJoin;
    this.newMessage = NewMessage;
    this.getMessages = GetMessages;
    this.roomDisconnect = RoomDisconnect;
  }

  public inizialize(): void {
    this.io.on('connection', (socket: Socket) => {
      socket.on('ROOM:JOIN', ({ roomId, userName }: IRoomJoinDTO) => {
        this.roomJoin.join({ socket, roomId, userName });
      });

      socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }: INewMessageDTO) => {
        this.newMessage.add({ socket, roomId, userName, text });
      });

      socket.on('ROOM:GET_MESSAGES', ({ roomId }: IGetMessagesDTO) => {
        this.getMessages.get({ socket, roomId });
      });

      socket.on('disconnect', () => {
        this.roomDisconnect.disconnect({ socket });
      });
    });
  }
}
