import UserData from 'domain/room/interfaces/user-data.interface';

export default interface User extends UserData {
  socketId: string;
}
