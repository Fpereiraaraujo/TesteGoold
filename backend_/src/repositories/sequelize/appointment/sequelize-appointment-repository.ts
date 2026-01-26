import { Op } from "sequelize";
import  Appointment from "../../../models/Appointment";
import  AppointmentAttributes from "../../../models/Appointment";
import { User } from "../../../models/User"; // Importar para o Join
import { Room } from "../../../models/Room"; // Importar para o Join (assumindo que existe)
import { CreateAppointmentDTO, FindAppointmentFilterDTO, CheckAvailabilityDTO } from "../../../services/appointment_use_case/dto/appointment-dto";
import { IAppointmentRepository } from "../../AppointmentRepository";

export class SequelizeAppointmentRepository implements IAppointmentRepository {

    // 1. Criar Agendamento
    async create(data: CreateAppointmentDTO): Promise<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "client_id" | "room_id">> {
        const appointment = await Appointment.create(data);
        return appointment.toJSON(); // toJSON garante que retorna o objeto puro
    }

    // 2. Listar com Filtros e Joins (O mais complexo)
    async findAllByFilter(filter: FindAppointmentFilterDTO): Promise<Array<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "notes"> & { client_name: string; room_name: string; }>> {
        
        const whereClause: any = {};

        // Monta o filtro dinamicamente
        if (filter.status) {
            whereClause.status = filter.status;
        }

        if (filter.dateStart && filter.dateEnd) {
            whereClause.date_time = {
                [Op.between]: [filter.dateStart, filter.dateEnd]
            };
        } else if (filter.dateStart) {
            whereClause.date_time = { [Op.gte]: filter.dateStart };
        }

        // Busca no banco incluindo as tabelas relacionadas
        const appointments = await Appointment.findAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'client',
                    attributes: ['name'],
                    // Se tiver filtro por nome de cliente, aplica aqui dentro
                    where: filter.clientName ? { name: { [Op.like]: `%${filter.clientName}%` } } : undefined
                },
                {
                    model: Room,
                    as: 'room',
                    attributes: ['name']
                }
            ],
            order: [['date_time', 'ASC']]
        });

        // Mapeia o resultado do Sequelize (Objeto complexo) para o formato plano que sua Interface pede
        return appointments.map((appt: any) => ({
            id: appt.id,
            date_time: appt.date_time,
            status: appt.status,
            notes: appt.notes,
            // Como usamos 'include', o sequelize coloca o objeto dentro. Acessamos assim:
            client_name: appt.client?.name || 'Cliente Desconhecido',
            room_name: appt.room?.name || 'Sala N/A'
        }));
    }

    // 3. Buscar por ID
    async findById(id: number): Promise<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "notes" | "client_id" | "room_id"> | null> {
        return await Appointment.findByPk(id);
    }

    // 4. Atualizar Status
    async updateStatus(id: number, status: "pending" | "confirmed" | "canceled"): Promise<boolean> {
        const [affectedCount] = await Appointment.update(
            { status: status },
            { where: { id } }
        );
        return affectedCount > 0;
    }

    // 5. Verificar Conflito de Horário
    async findConflictingAppointment(data: CheckAvailabilityDTO): Promise<Pick<AppointmentAttributes, "id" | "date_time"> | null> {
        // Verifica se existe agendamento na mesma sala, num horário que colida
        // Lógica simples: Se já existe algo EXATAMENTE no horário de início ou dentro do intervalo
        return await Appointment.findOne({
            where: {
                room_id: data.room_id,
                date_time: {
                    [Op.between]: [data.date_time_start, data.date_time_end]
                },
                status: { [Op.not]: 'canceled' } // Ignora agendamentos cancelados
            },
            attributes: ['id', 'date_time'] // Traz só o necessário
        });
    }

    // 6. Buscar histórico do cliente
    async findByClientId(client_id: number): Promise<Array<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "room_id">>> {
        return await Appointment.findAll({
            where: { client_id },
            order: [['date_time', 'DESC']]
        });
    }
}