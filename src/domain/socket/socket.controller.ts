import { Server, Socket } from 'socket.io';
import { IRoomJoinDTO } from './interactors/room-join';
import { INewMessageDTO } from './interactors/new-message';
import { IGetMessagesDTO } from './interactors/get-messages';
import { IRoomJoinInteractor } from './interfaces/join.interface';
import { INewMessageInteractor } from './interfaces/new-messages.interface';
import { IGetMessagesInteractor } from './interfaces/get-messages.interface';
import { IRoomDisconnectInteractor } from './interfaces/room-disconnect.interface';

export class SocketController {
  private RoomJoin: IRoomJoinInteractor;
  private NewMessage: INewMessageInteractor;
  private GetMessages: IGetMessagesInteractor;
  private RoomDisconnect: IRoomDisconnectInteractor;

  private io: Server;

  constructor(
    io: Server,
    RoomJoin: IRoomJoinInteractor,
    NewMessage: INewMessageInteractor,
    GetMessages: IGetMessagesInteractor,
    RoomDisconnect: IRoomDisconnectInteractor
  ) {
    this.io = io;
    this.RoomJoin = RoomJoin;
    this.NewMessage = NewMessage;
    this.GetMessages = GetMessages;
    this.RoomDisconnect = RoomDisconnect;
  }

  public inizialize(): void {
    this.io.on('connection', (socket: Socket) => {
      socket.on('ROOM:JOIN', ({ roomId, userName }: IRoomJoinDTO) => {
        this.RoomJoin.join({ socket, roomId, userName });
      });

      socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }: INewMessageDTO) => {
        this.NewMessage.add({ socket, roomId, userName, text });
      });

      socket.on('ROOM:GET_MESSAGES', ({ roomId }: IGetMessagesDTO) => {
        this.GetMessages.get({ socket, roomId });
      });

      socket.on('disconnect', () => {
        this.RoomDisconnect.disconnect({ socket });
      });
    });
  }
}
