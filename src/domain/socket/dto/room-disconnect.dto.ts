import { Socket } from 'socket.io';

export default interface IRoomDisconnectDTO {
  socket: Socket;
}
