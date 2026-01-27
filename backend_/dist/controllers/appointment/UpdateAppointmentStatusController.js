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
exports.UpdateAppointmentStatusController = void 0;
const UpdateAppointmentStatusService_1 = require("../../services/appointment/UpdateAppointmentStatusService");
class UpdateAppointmentStatusController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { appointment_id, status } = req.body;
            const user_id = req.user_id;
            const service = new UpdateAppointmentStatusService_1.UpdateAppointmentStatusService();
            try {
                const appointment = yield service.execute({
                    appointment_id: Number(appointment_id),
                    status,
                    user_id: Number(user_id)
                });
                return res.json(appointment);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.UpdateAppointmentStatusController = UpdateAppointmentStatusController;
