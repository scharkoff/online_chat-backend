import Room from './interfaces/room.interface';

export default class Rooms {
  private rooms: Map<string, Room> = new Map();

  public getRooms(): Map<string, Room> {
    return this.rooms;
  }
}
