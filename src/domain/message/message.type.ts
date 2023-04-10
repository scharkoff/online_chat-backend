import { RequiredUserAndMessageData } from 'domain/room/rooms.type';

export interface Message extends RequiredUserAndMessageData {
  text?: string;
}
