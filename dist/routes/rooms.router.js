"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RoomsRouter {
    constructor(roomController) {
        this.roomsRouter = (0, express_1.Router)();
        this.roomController = roomController;
        this.roomsRouter.get('/rooms/:id', this.roomController.getRoomData.bind(this.roomController));
        this.roomsRouter.post('/rooms', this.roomController.createRoomData.bind(this.roomController));
    }
    get() {
        return this.roomsRouter;
    }
}
exports.default = RoomsRouter;
//# sourceMappingURL=rooms.router.js.map