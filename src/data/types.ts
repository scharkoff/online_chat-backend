interface IMessage {
  userName: string;
  text: string;
}

export interface IUser {
  userName: string;
}

export type TRoomsMap = Map<string, Map<string, Map<string, IMessage[]>>>;
