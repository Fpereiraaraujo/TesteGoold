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
exports.UpdateRoomController = void 0;
const UpdateRoomService_1 = require("../../services/room/UpdateRoomService");
class UpdateRoomController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { room_id } = req.params;
            const { name, start_time, end_time } = req.body;
            const service = new UpdateRoomService_1.UpdateRoomService();
            try {
                const room = yield service.execute({
                    room_id: Number(room_id),
                    name,
                    start_time,
                    end_time
                });
                return res.json(room);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.UpdateRoomController = UpdateRoomController;
