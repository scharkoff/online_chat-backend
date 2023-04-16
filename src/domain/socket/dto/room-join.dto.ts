import { Socket } from 'socket.io';

export default interface IRoomJoinDTO {
  socket: Socket;
  roomId: string;
  userName: string;
}
