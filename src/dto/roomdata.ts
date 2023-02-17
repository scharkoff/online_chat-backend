import { IUserDTO } from './user';
import { IMessageDTO } from './message';

export interface IRoomDataDTO {
  users: IUserDTO[];
  messages: IMessageDTO[];
}
