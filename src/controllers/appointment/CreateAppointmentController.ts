import { Request, Response } from 'express';
import { z } from 'zod';
import { makeCreateAppointmentUseCase } from '../../services/factories/appointment_make/make-create-appointment-use-case';
import Appointment from '../../models/Appointment';
import { User } from '../../models/User';
import { Room } from '../../models/Room';


export class ListAppointmentsController {
    async handle(req: Request, res: Response) {
        try {
            const appointments = await Appointment.findAll({
                include: [
                    { model: User, as: 'client', attributes: ['name', 'email'] },
                    { model: Room, as: 'room', attributes: ['name'] }
                ]
            });
            
            return res.json(appointments);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar agendamentos" });
        }
    }
}


export class CreateAppointmentController {
    
    public async handle(req: Request, res: Response) {
        try {
            const { body } = req;
            
            const createAppointmentBodySchema = z.object({
                room_id: z.number(),
                date_time: z.coerce.date(),
                notes: z.string().optional()
            });

            const bodyZod = createAppointmentBodySchema.parse(body);
          
    
            const userIdFromToken = req.user_id; 

          
            const createAppointmentUseCase = await makeCreateAppointmentUseCase();

            const result = await createAppointmentUseCase.execute({
                ...bodyZod, 
                client_id: Number(userIdFromToken) 
            });

            return res.status(201).json({
                success: true,
                hasError: false,
                error: null,
                data: result
            });

        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    hasError: true,
                    error: error.issues.map((issue) => issue.message), 
                    data: null,
                });
            }

            return res.status(400).json({
                success: false,
                hasError: true,
                error: error.message || "Erro inesperado.",
                data: null,
            });
        }
    }
}


export class ListMyAppointmentsController {
    async handle(req: Request, res: Response) {
        try {
            const client_id = req.user_id; 

            const appointments = await Appointment.findAll({
                where: {
                    client_id: Number(client_id)
                },
                include: [
                    { model: Room, as: 'room', attributes: ['name'] },
                ],
                order: [['date_time', 'DESC']]
            });
            
            return res.json(appointments);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar seus agendamentos" });
        }
    }
}