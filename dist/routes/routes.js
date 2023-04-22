import RoomsRouter from './rooms.router.js';
import Container from '../container.js';
import RoomController from '../domain/room/rooms.controller.js';
export default class Routes {
    constructor(io) {
        this.routes = [];
        this.io = io;
        this.routes.push(new RoomsRouter(new Container(this.io).get(RoomController)).get());
    }
    get() {
        return this.routes;
    }
}
//# sourceMappingURL=routes.js.map