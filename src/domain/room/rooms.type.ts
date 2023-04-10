import { User } from '../user/user.types';
import { Message } from '../message/message.type';

export interface RequiredUserAndMessageData {
  userName: string;
}

export type TRoomsMap = Map<string, Map<string, Message[] | User[]>>;

export interface Room {
  users: User[];
  messages: Message[];
}

export const rooms: TRoomsMap = new Map();
