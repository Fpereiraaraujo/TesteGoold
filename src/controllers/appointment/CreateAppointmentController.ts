import { Request, Response } from 'express';
import { z } from 'zod';
import { makeCreateAppointmentUseCase } from '../../services/factories/appointment_make/make-create-appointment-use-case';
import Appointment from '../../models/Appointment';
import { User } from '../../models/User';
import { Room } from '../../models/Room';

// --------------------------------------------------------
// 1. LISTAGEM (Mantenha esta para o ADMIN)
// --------------------------------------------------------
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

// --------------------------------------------------------
// 2. CRIAÇÃO (Esta é a que mudamos para o CLIENTE)
// --------------------------------------------------------
export class CreateAppointmentController {
    
    public async handle(req: Request, res: Response) {
        try {
            const { body } = req;
            
            // MUDANÇA 1: Removemos o 'client_id' daqui. 
            // O cliente envia apenas Sala, Data e Notas.
            const createAppointmentBodySchema = z.object({
                // client_id: z.number(),  <-- REMOVIDO
                room_id: z.number(),
                date_time: z.coerce.date(),
                notes: z.string().optional()
            });

            const bodyZod = createAppointmentBodySchema.parse(body);

            // MUDANÇA 2: Pegamos o ID do token
            // O middleware 'isAuthenticated' colocou o user_id dentro do req
            const userIdFromToken = req.user_id; 

            console.log("ID RECUPERADO DO TOKEN:", userIdFromToken);
            console.log("TIPO DO ID:", typeof userIdFromToken);

            const createAppointmentUseCase = await makeCreateAppointmentUseCase();

            // MUDANÇA 3: Injetamos o ID manualmente na chamada do useCase
            const result = await createAppointmentUseCase.execute({
                ...bodyZod, // Espalha room_id, date_time, notes
                client_id: Number(userIdFromToken) // Adiciona o ID seguro
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

// Controller para o Cliente ver SÓ OS DELE
export class ListMyAppointmentsController {
    async handle(req: Request, res: Response) {
        try {
            const client_id = req.user_id; // Pega o ID do token

            const appointments = await Appointment.findAll({
                where: {
                    client_id: Number(client_id) // <--- O FILTRO IMPORTANTE
                },
                include: [
                    { model: Room, as: 'room', attributes: ['name'] },
                    // Não precisa incluir User/Client, pois ele já sabe quem ele é
                ],
                order: [['date_time', 'DESC']]
            });
            
            return res.json(appointments);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar seus agendamentos" });
        }
    }
}