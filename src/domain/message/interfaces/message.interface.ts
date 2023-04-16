import UserData from 'domain/room/interfaces/user-data.interface';

export default interface Message extends UserData {
  text: string;
}
