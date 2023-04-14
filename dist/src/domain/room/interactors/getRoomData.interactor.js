"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoomDataInteractor = void 0;
const rooms_type_1 = require("../rooms.type");
class GetRoomDataInteractor {
    getRoomData(req, res) {
        try {
            const roomId = req.params.id;
            const users = rooms_type_1.rooms.get(roomId)?.users;
            const messages = rooms_type_1.rooms.get(roomId)?.messages;
            let roomData = { users: [], messages: [] };
            if (typeof users !== 'undefined' && typeof messages !== 'undefined') {
                roomData = {
                    users: [...users],
                    messages: [...messages]
                };
            }
            res.status(200).json(roomData);
        }
        catch (error) {
            res.status(500).json({
                status: 'error',
                message: error
            });
        }
    }
}
exports.GetRoomDataInteractor = GetRoomDataInteractor;
