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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentStatusService = void 0;
const Appointment_1 = __importDefault(require("../../models/Appointment"));
const CreateLogService_1 = require("../log/CreateLogService");
class UpdateAppointmentStatusService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ appointment_id, status, user_id }) {
            const appointment = yield Appointment_1.default.findByPk(appointment_id);
            if (!appointment) {
                throw new Error("Agendamento não encontrado.");
            }
            appointment.status = status;
            yield appointment.save();
            const createLogService = new CreateLogService_1.CreateLogService();
            yield createLogService.execute({
                user_id: user_id,
                action: "Atualizar Status",
                module: "Agendamento",
                details: `Agendamento ${appointment_id} atualizado para: ${status}`
            });
            return appointment;
        });
    }
}
exports.UpdateAppointmentStatusService = UpdateAppointmentStatusService;
