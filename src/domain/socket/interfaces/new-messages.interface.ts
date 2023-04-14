import { INewMessageDTO } from '../interactors/new-message';

export interface INewMessageInteractor {
  add({ socket, roomId, userName, text }: INewMessageDTO): void;
}
