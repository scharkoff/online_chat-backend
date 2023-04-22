import rooms from '../index.js';
export default class GetRoomDataInteractor {
    getRoomData(req, res) {
        try {
            const roomId = req.params.id;
            const users = rooms.get(roomId)?.users;
            const messages = rooms.get(roomId)?.messages;
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
//# sourceMappingURL=getRoomData.interactor.js.map