import { SequelizeAppointmentRepository } from "../../../repositories/sequelize/appointment/sequelize-appointment-repository";
import { CreateAppointmentUseCase } from "../../appointment_use_case/Appointment-use-case";


export async function makeCreateAppointmentUseCase() {

    const appointmentRepository = new SequelizeAppointmentRepository();

    const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository);

    return createAppointmentUseCase;
}