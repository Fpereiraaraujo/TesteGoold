import  Appointment  from "../../models/Appointment";

export interface CreateAppointmentDTO {
    date_time: Date;
    client_id: number;
    room_id?: number;
    notes?: string;
}

export interface IAppointmentRepository {
    create(data: CreateAppointmentDTO): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findById(id: number): Promise<Appointment | null>;
    updateStatus(id: number, status: string): Promise<boolean>;
}