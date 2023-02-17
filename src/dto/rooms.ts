import { IUserDTO } from '../dto/user';
import { IMessageDTO } from '../dto/message';

export type TRoomsMapDTO = Map<string, Map<string, IMessageDTO[] | IUserDTO[]>>;
