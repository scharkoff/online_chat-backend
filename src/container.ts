import { GetMessages } from 'domain/socket/interactors/get-messages';
import { RoomJoin } from 'domain/socket/interactors/room-join';
import { NewMessage } from 'domain/socket/interactors/new-message';
import { RoomDisconnect } from 'domain/socket/interactors/room-disconnect';
import { SocketController } from 'domain/socket/socket.controller';
import { Server } from 'socket.io';

export class Container {
  private instances = new Map();

  constructor(io: Server) {
    this.instances.set(
      SocketController,
      new SocketController(
        io,
        new RoomJoin(),
        new NewMessage(),
        new GetMessages(),
        new RoomDisconnect()
      )
    );
  }

  public get<T>(type: { new (...args: any[]): T }): T {
    const instance = this.instances.get(type);

    if (!instance) {
      throw new Error(`Instance of ${type.name} not found in container`);
    }

    return instance;
  }
}
