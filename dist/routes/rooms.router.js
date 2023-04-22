import { Router } from 'express';
export default class RoomsRouter {
    constructor(roomController) {
        this.roomsRouter = Router();
        this.roomController = roomController;
        this.roomsRouter.get('/rooms/:id', this.roomController.getRoomData.bind(this.roomController));
        this.roomsRouter.post('/rooms', this.roomController.createRoomData.bind(this.roomController));
    }
    get() {
        return this.roomsRouter;
    }
}
//# sourceMappingURL=rooms.router.js.map