"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomDataInteractor = void 0;
const rooms_type_1 = require("../rooms.type");
class CreateRoomDataInteractor {
    createRoom(req, res) {
        try {
            const { roomId } = req.body;
            if (!rooms_type_1.rooms.has(roomId)) {
                const users = [];
                const messages = [];
                rooms_type_1.rooms.set(roomId, { users, messages });
            }
            res.status(200).send({
                status: 'success'
            });
        }
        catch (error) {
            res.status(500).send({
                status: 'error',
                message: error
            });
        }
    }
}
exports.CreateRoomDataInteractor = CreateRoomDataInteractor;
