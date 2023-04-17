import IRoomJoinInteractor from '../interfaces/join.interface.js';
import IRoomJoinDTO from '../dto/room-join.dto.js';
import rooms from '../../../domain/room/index.js';

export default class RoomJoin implements IRoomJoinInteractor {
  public join({ socket, roomId, userName }: IRoomJoinDTO): void {
    if (typeof socket !== 'undefined') {
      socket.join(roomId);

      rooms.get(roomId)?.users?.push({ socketId: socket.id, userName });
      const users = rooms.get(roomId)?.users?.values();

      if (typeof users !== 'undefined') {
        socket.broadcast.to(roomId).emit('ROOM:JOINED', [...users]);
      }
    } else {
      throw new TypeError('The socket is undefined');
    }
  }
}
