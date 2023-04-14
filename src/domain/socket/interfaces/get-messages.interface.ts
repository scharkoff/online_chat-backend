import { IGetMessagesDTO } from '../interactors/get-messages';

export interface IGetMessagesInteractor {
  get({ socket, roomId }: IGetMessagesDTO): void;
}
