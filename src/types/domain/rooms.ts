import { IMessageDTO } from 'utils/dto/message';
import { IUserDTO } from 'utils/dto/user';

export type TRoomsMap = Map<string, Map<string, IMessageDTO[] | IUserDTO[]>>;
