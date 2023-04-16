"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsRouter = void 0;
const express_1 = require("express");
const rooms_controller_1 = require("../domain/room/rooms.controller");
const __1 = __importDefault(require("../../"));
exports.roomsRouter = (0, express_1.Router)();
const roomController = __1.default.getContainer().get(rooms_controller_1.RoomController);
exports.roomsRouter.get('/rooms/:id', roomController.getRoomData.bind(roomController));
exports.roomsRouter.post('/rooms', roomController.createRoomData.bind(roomController));
