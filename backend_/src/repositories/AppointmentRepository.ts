import  AppointmentAttributes  from "../models/Appointment";
import { 
    CreateAppointmentDTO, 
    FindAppointmentFilterDTO, 
    CheckAvailabilityDTO 
} from "../../src/services/appointment_use_case/dto/appointment-dto";

export interface IAppointmentRepository {

   
    create(data: CreateAppointmentDTO): Promise<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "client_id" | "room_id">>;

   
    findAllByFilter(filter: FindAppointmentFilterDTO): Promise<Array<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "notes"> & { client_name: string; room_name: string }>>;

    
    findById(id: number): Promise<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "notes" | "client_id" | "room_id"> | null>;

   
    updateStatus(id: number, status: 'pending' | 'confirmed' | 'canceled'): Promise<boolean>;

   

   
    findConflictingAppointment(data: CheckAvailabilityDTO): Promise<Pick<AppointmentAttributes, "id" | "date_time"> | null>;

   
    findByClientId(client_id: number): Promise<Array<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "room_id">>>;
}