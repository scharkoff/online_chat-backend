import IRoomJoinDTO from '../dto/room-join.dto.js';

export default interface IRoomJoinInteractor {
  join({ socket, roomId, userName }: IRoomJoinDTO): void;
}
