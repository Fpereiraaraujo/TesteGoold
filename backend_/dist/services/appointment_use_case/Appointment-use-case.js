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
exports.CreateAppointmentUseCase = void 0;
const CreateLogService_1 = require("../../services/log/CreateLogService");
class CreateAppointmentUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const durationInMinutes = 30;
            const dateStart = new Date(data.date_time);
            const dateEnd = new Date(dateStart.getTime() + durationInMinutes * 60000);
            const conflict = yield this.appointmentRepository.findConflictingAppointment({
                room_id: data.room_id,
                date_time_start: dateStart,
                date_time_end: dateEnd
            });
            if (conflict) {
                throw new Error("Horário indisponível para esta sala.");
            }
            const newAppointment = yield this.appointmentRepository.create(data);
            const createLogService = new CreateLogService_1.CreateLogService();
            yield createLogService.execute({
                user_id: data.client_id,
                action: "Criação de agendamento",
                module: "Agendamento",
                details: `Agendou para o dia ${data.date_time}`
            });
            return newAppointment;
        });
    }
}
exports.CreateAppointmentUseCase = CreateAppointmentUseCase;
