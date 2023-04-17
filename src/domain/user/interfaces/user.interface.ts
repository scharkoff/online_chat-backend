import UserData from '../../../domain/room/interfaces/user-data.interface.js';

export default interface User extends UserData {
  socketId: string;
}
