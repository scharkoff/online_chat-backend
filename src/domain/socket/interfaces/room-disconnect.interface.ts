import IRoomDisconnectDTO from '../dto/room-disconnect.dto';

export default interface IRoomDisconnectInteractor {
  disconnect({ socket }: IRoomDisconnectDTO): void;
}
