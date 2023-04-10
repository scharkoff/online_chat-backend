import { RequiredUserAndMessageData } from 'domain/room/rooms.type';

export interface User extends RequiredUserAndMessageData {
  socketId?: string;
}

export function instanceOfUser(arr: unknown): arr is User[] {
  return typeof arr !== 'undefined';
}
