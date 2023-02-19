import { IUserDTO } from '../dto/user';
import { IMessageDTO } from '../dto/message';

export type TRoomsMap = Map<string, Map<string, IMessageDTO[] | IUserDTO[]>>;
