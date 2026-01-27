import Appointment from "../../models/Appointment";
import { CreateLogService } from "../log/CreateLogService";

interface IRequest {
  appointment_id: number;
  status: 'approved' | 'canceled' | 'pending';
  user_id: number; 
}

class UpdateAppointmentStatusService {
  async execute({ appointment_id, status, user_id }: IRequest) {
    
   
    const appointment = await Appointment.findByPk(appointment_id);

    if (!appointment) {
      throw new Error("Agendamento não encontrado.");
    }


    appointment.status = status;
    await appointment.save();

   
    const createLogService = new CreateLogService();
    await createLogService.execute({
      user_id: user_id,
      action: "Atualizar Status",
      module: "Agendamento",
      details: `Agendamento ${appointment_id} atualizado para: ${status}`
    });

    return appointment;
  }
}

export { UpdateAppointmentStatusService };