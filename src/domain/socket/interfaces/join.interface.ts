import { IRoomJoinDTO } from '../interactors/room-join';

export interface IRoomJoinInteractor {
  join({ socket, roomId, userName }: IRoomJoinDTO): void;
}
