import INewMessageDTO from '../dto/new-messages.dto.js';

export default interface INewMessageInteractor {
  add({ socket, roomId, userName, text }: INewMessageDTO): void;
}
