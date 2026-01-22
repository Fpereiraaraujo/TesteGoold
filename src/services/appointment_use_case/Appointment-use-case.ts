
import { IAppointmentRepository } from "../../repositories/AppointmentRepository";
import { CreateAppointmentDTO } from "./dto/appointment-dto";

export class CreateAppointmentUseCase {
    
    // Injeção de Dependência:
    // Recebemos a INTERFACE, não a classe concreta. 
    // Assim seu UseCase funciona com Sequelize, TypeORM ou até memória.
    constructor(private appointmentRepository: IAppointmentRepository) {}

    async execute(data: CreateAppointmentDTO) {
        // 1. Definir a duração do agendamento (Regra de Negócio)
        // O teste dizia "Blocos de 30 minutos". Vamos calcular o horário final.
        const durationInMinutes = 30;
        const dateStart = new Date(data.date_time);
        const dateEnd = new Date(dateStart.getTime() + durationInMinutes * 60000);

        // 2. Verificar Disponibilidade (Validação)
        const conflict = await this.appointmentRepository.findConflictingAppointment({
            room_id: data.room_id,
            date_time_start: dateStart,
            date_time_end: dateEnd
        });

        if (conflict) {
            throw new Error("Horário indisponível para esta sala.");
        }

        // 3. Se passou na validação, chama o repositório para salvar
        const newAppointment = await this.appointmentRepository.create(data);

        return newAppointment;
    }
}