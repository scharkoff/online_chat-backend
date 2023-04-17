import IRoomDisconnectDTO from '../dto/room-disconnect.dto.js';

export default interface IRoomDisconnectInteractor {
  disconnect({ socket }: IRoomDisconnectDTO): void;
}
