import { IRoomDisconnectDTO } from '../interactors/room-disconnect';

export interface IRoomDisconnectInteractor {
  disconnect({ socket }: IRoomDisconnectDTO): void;
}
