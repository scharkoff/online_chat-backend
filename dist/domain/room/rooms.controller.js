export default class RoomController {
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
