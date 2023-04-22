"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_1 = __importDefault(require("./rooms"));
const rooms = new rooms_1.default().getRooms();
exports.default = rooms;
//# sourceMappingURL=index.js.map