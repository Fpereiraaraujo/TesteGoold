import { Request, Response } from "express";
import { UpdateAppointmentStatusService } from "../../services/appointment/UpdateAppointmentStatusService";

class UpdateAppointmentStatusController {
  async handle(req: Request, res: Response) {
    const { appointment_id, status } = req.body;
    const user_id = req.user_id; 

    const service = new UpdateAppointmentStatusService();

    try {
      const appointment = await service.execute({
        appointment_id: Number(appointment_id), 
        status,
        user_id: Number(user_id) 
      });

      return res.json(appointment);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { UpdateAppointmentStatusController };