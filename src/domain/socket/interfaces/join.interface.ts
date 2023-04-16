import IRoomJoinDTO from '../dto/room-join.dto';

export default interface IRoomJoinInteractor {
  join({ socket, roomId, userName }: IRoomJoinDTO): void;
}
