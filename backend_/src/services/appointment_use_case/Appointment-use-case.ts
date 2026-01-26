import { IAppointmentRepository } from "../../repositories/AppointmentRepository";
import { CreateAppointmentDTO } from "./dto/appointment-dto";
import { CreateLogService } from "../../services/log/CreateLogService"; 

export class CreateAppointmentUseCase {
    
    constructor(private appointmentRepository: IAppointmentRepository) {}

    async execute(data: CreateAppointmentDTO) {
        
        const durationInMinutes = 30;
        const dateStart = new Date(data.date_time);
        const dateEnd = new Date(dateStart.getTime() + durationInMinutes * 60000);

       
        const conflict = await this.appointmentRepository.findConflictingAppointment({
            room_id: data.room_id,
            date_time_start: dateStart,
            date_time_end: dateEnd
        });

        if (conflict) {
            throw new Error("Horário indisponível para esta sala.");
        }

     
        const newAppointment = await this.appointmentRepository.create(data);

   
        const createLogService = new CreateLogService();
        
        await createLogService.execute({
            user_id: data.client_id, 
            action: "Criação de agendamento",
            module: "Agendamento",
            details: `Agendou para o dia ${data.date_time}`
        });
        

        return newAppointment;
    }
}