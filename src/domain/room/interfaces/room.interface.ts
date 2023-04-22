import Message from 'domain/message/interfaces/message.interface';
import User from 'domain/user/interfaces/user.interface';

export default interface Room {
  users: User[];
  messages: Message[];
}
