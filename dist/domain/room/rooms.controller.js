"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoomController {
    constructor(getRoomDataInteractor, createRoomDataInteractor) {
        this.getRoomDataInteractor = getRoomDataInteractor;
        this.createRoomDataInteractor = createRoomDataInteractor;
    }
    getRoomData(req, res) {
        return this.getRoomDataInteractor.getRoomData(req, res);
    }
    createRoomData(req, res) {
        return this.createRoomDataInteractor.createRoom(req, res);
    }
}
exports.default = RoomController;
//# sourceMappingURL=rooms.controller.js.map