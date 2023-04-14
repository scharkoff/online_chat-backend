"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomContoller = void 0;
const getRoomData_interactor_1 = require("./interactors/getRoomData.interactor");
const createRoomData_interactor_1 = require("./interactors/createRoomData.interactor");
class RoomContoller {
    constructor() {
        this.getRoomDataInteractor = new getRoomData_interactor_1.GetRoomDataInteractor();
        this.createRoomDataInteractor = new createRoomData_interactor_1.CreateRoomDataInteractor();
    }
    getRoomData(req, res) {
        return this.getRoomDataInteractor.getRoomData(req, res);
    }
    createRoomData(req, res) {
        return this.createRoomDataInteractor.createRoom(req, res);
    }
}
exports.RoomContoller = RoomContoller;
