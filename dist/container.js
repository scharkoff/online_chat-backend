import GetMessages from './domain/socket/interactors/get-messages.js';
import RoomJoin from './domain/socket/interactors/room-join.js';
import NewMessage from './domain/socket/interactors/new-message.js';
import RoomDisconnect from './domain/socket/interactors/room-disconnect.js';
import SocketController from './domain/socket/socket.controller.js';
import RoomController from './domain/room/rooms.controller.js';
import CreateRoomDataInteractor from './domain/room/interactors/createRoomData.interactor.js';
import GetRoomDataInteractor from './domain/room/interactors/getRoomData.interactor.js';
export default class Container {
    constructor(io) {
        this.instances = new Map();
        this.instances.set(SocketController, new SocketController(io, new RoomJoin(), new NewMessage(), new GetMessages(), new RoomDisconnect()));
        this.instances.set(RoomController, new RoomController(new GetRoomDataInteractor(), new CreateRoomDataInteractor()));
    }
    get(type) {
        const instance = this.instances.get(type);
        if (!instance) {
            throw new Error(`Instance of ${type.name} not found in container`);
        }
        return instance;
    }
}
