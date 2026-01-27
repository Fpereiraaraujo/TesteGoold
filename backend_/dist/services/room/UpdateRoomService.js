"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoomService = void 0;
const Room_1 = require("../../models/Room");
class UpdateRoomService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ room_id, name, start_time, end_time }) {
            const room = yield Room_1.Room.findByPk(room_id);
            if (!room) {
                throw new Error("Sala não encontrada");
            }
            room.name = name;
            room.start_time = start_time;
            room.end_time = end_time;
            yield room.save();
            return room;
        });
    }
}
exports.UpdateRoomService = UpdateRoomService;
