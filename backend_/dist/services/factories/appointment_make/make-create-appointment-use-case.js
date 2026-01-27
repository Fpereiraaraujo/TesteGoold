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
exports.makeCreateAppointmentUseCase = makeCreateAppointmentUseCase;
const sequelize_appointment_repository_1 = require("../../../repositories/sequelize/appointment/sequelize-appointment-repository");
const Appointment_use_case_1 = require("../../appointment_use_case/Appointment-use-case");
function makeCreateAppointmentUseCase() {
    return __awaiter(this, void 0, void 0, function* () {
        const appointmentRepository = new sequelize_appointment_repository_1.SequelizeAppointmentRepository();
        const createAppointmentUseCase = new Appointment_use_case_1.CreateAppointmentUseCase(appointmentRepository);
        return createAppointmentUseCase;
    });
}
