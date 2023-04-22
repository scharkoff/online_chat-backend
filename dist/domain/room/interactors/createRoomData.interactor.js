import rooms from '../index.js';
export default class CreateRoomDataInteractor {
    createRoom(req, res) {
        try {
            const { roomId } = req.body;
            if (!rooms.has(roomId)) {
                const users = [];
                const messages = [];
                rooms.set(roomId, { users, messages });
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
//# sourceMappingURL=createRoomData.interactor.js.map