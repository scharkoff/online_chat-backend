import IGetMessagesDTO from '../dto/get-messages.dto';

export default interface IGetMessagesInteractor {
  get({ socket, roomId }: IGetMessagesDTO): void;
}
