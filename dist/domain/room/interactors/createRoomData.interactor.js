"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class CreateRoomDataInteractor {
    createRoom(req, res) {
        try {
            const { roomId } = req.body;
            if (!__1.default.has(roomId)) {
                const users = [];
                const messages = [];
                __1.default.set(roomId, { users, messages });
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
exports.default = CreateRoomDataInteractor;
//# sourceMappingURL=createRoomData.interactor.js.map