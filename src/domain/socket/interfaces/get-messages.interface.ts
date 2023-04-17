import IGetMessagesDTO from '../dto/get-messages.dto.js';

export default interface IGetMessagesInteractor {
  get({ socket, roomId }: IGetMessagesDTO): void;
}
