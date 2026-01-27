import { Op } from "sequelize";
import  Appointment from "../../../models/Appointment";
import  AppointmentAttributes from "../../../models/Appointment";
import { User } from "../../../models/User"; 
import { Room } from "../../../models/Room"; 
import { CreateAppointmentDTO, FindAppointmentFilterDTO, CheckAvailabilityDTO } from "../../../services/appointment_use_case/dto/appointment-dto";
import { IAppointmentRepository } from "../../AppointmentRepository";

export class SequelizeAppointmentRepository implements IAppointmentRepository {

    
    async create(data: CreateAppointmentDTO): Promise<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "client_id" | "room_id">> {
        const appointment = await Appointment.create(data);
        return appointment.toJSON(); 
    }

   
    async findAllByFilter(filter: FindAppointmentFilterDTO): Promise<Array<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "notes"> & { client_name: string; room_name: string; }>> {
        
        const whereClause: any = {};

        
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

        
        const appointments = await Appointment.findAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'client',
                    attributes: ['name'],
                    
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

      
        return appointments.map((appt: any) => ({
            id: appt.id,
            date_time: appt.date_time,
            status: appt.status,
            notes: appt.notes,
            client_name: appt.client?.name || 'Cliente Desconhecido',
            room_name: appt.room?.name || 'Sala N/A'
        }));
    }

   
    async findById(id: number): Promise<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "notes" | "client_id" | "room_id"> | null> {
        return await Appointment.findByPk(id);
    }

    
    async updateStatus(id: number, status: "pending" | "confirmed" | "canceled"): Promise<boolean> {
        const [affectedCount] = await Appointment.update(
            { status: status },
            { where: { id } }
        );
        return affectedCount > 0;
    }

 
    async findConflictingAppointment(data: CheckAvailabilityDTO): Promise<Pick<AppointmentAttributes, "id" | "date_time"> | null> {
       
        return await Appointment.findOne({
            where: {
                room_id: data.room_id,
                date_time: {
                    [Op.between]: [data.date_time_start, data.date_time_end]
                },
                status: { [Op.not]: 'canceled' } 
            },
            attributes: ['id', 'date_time'] 
        });
    }

   
    async findByClientId(client_id: number): Promise<Array<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "room_id">>> {
        return await Appointment.findAll({
            where: { client_id },
            order: [['date_time', 'DESC']]
        });
    }
}