"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class GetRoomDataInteractor {
    getRoomData(req, res) {
        try {
            const roomId = req.params.id;
            const users = __1.default.get(roomId)?.users;
            const messages = __1.default.get(roomId)?.messages;
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
exports.default = GetRoomDataInteractor;
//# sourceMappingURL=getRoomData.interactor.js.map