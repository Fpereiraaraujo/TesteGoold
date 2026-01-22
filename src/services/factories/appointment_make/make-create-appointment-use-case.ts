// Importa a implementação CONCRETA do repositório (Sequelize)

// Importa a regra de negócio
import { SequelizeAppointmentRepository } from "../../../repositories/sequelize/appointment/sequelize-appointment-repository";
import { CreateAppointmentUseCase } from "../../appointment_use_case/Appointment-use-case";


export async function makeCreateAppointmentUseCase() {
    // 1. Instancia o Repositório (Quem toca no banco)
    const appointmentRepository = new SequelizeAppointmentRepository();

    // 2. Instancia o UseCase injetando o Repositório nele
    const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository);

    return createAppointmentUseCase;
}