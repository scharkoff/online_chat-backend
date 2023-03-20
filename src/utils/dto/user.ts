export interface IUserDTO {
  socketId?: string;
  userName?: string;
}

export function instanceOfIUserDTO(arr: unknown): arr is IUserDTO[] {
  return typeof arr !== 'undefined';
}
