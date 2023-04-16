import { Socket } from 'socket.io';

export default interface IGetMessagesDTO {
  socket: Socket;
  roomId: string;
}
