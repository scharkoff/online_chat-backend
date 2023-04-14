"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const rooms_controller_1 = require("../domain/room/rooms.controller");
exports.userRouter = (0, express_1.Router)();
const roomContoller = new rooms_controller_1.RoomContoller();
exports.userRouter.get('/rooms/:id', roomContoller.getRoomData.bind(roomContoller));
exports.userRouter.post('/rooms', roomContoller.createRoomData.bind(roomContoller));
