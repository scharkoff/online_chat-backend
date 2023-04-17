import UserData from '../../../domain/room/interfaces/user-data.interface.js';

export default interface Message extends UserData {
  text: string;
}
