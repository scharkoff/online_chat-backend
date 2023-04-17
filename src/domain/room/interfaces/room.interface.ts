import Message from '../../../domain/message/interfaces/message.interface.js';
import User from '../../../domain/user/interfaces/user.interface';

export default interface Room {
  users: User[];
  messages: Message[];
}
