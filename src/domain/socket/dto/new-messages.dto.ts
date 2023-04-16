import { Socket } from 'socket.io';

export default interface INewMessageDTO {
  socket: Socket;
  roomId: string;
  userName: string;
  text: string;
}
