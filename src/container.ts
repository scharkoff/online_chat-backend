import { GetMessages } from 'domain/socket/interactors/get-messages';
import { RoomJoin } from 'domain/socket/interactors/room-join';
import { NewMessage } from 'domain/socket/interactors/new-message';
import { RoomDisconnect } from 'domain/socket/interactors/room-disconnect';
import { SocketController } from 'domain/socket/socket.controller';
import { Server } from 'socket.io';
import { RoomController } from 'domain/room/rooms.controller';
import { CreateRoomDataInteractor } from 'domain/room/interactors/createRoomData.interactor';
import { GetRoomDataInteractor } from 'domain/room/interactors/getRoomData.interactor';

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

    this.instances.set(
      RoomController,
      new RoomController(new GetRoomDataInteractor(), new CreateRoomDataInteractor())
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
