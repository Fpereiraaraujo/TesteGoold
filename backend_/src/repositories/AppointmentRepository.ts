import  AppointmentAttributes  from "../models/Appointment";
import { 
    CreateAppointmentDTO, 
    FindAppointmentFilterDTO, 
    CheckAvailabilityDTO 
} from "../../src/services/appointment_use_case/dto/appointment-dto";

export interface IAppointmentRepository {

    // Método responsável por criar um novo agendamento e retornar os dados básicos criados
    create(data: CreateAppointmentDTO): Promise<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "client_id" | "room_id">>;

    // Método responsável por listar agendamentos com filtros (Data, Nome do Cliente, Status)
    // Usado na tela principal do Admin
    findAllByFilter(filter: FindAppointmentFilterDTO): Promise<Array<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "notes"> & { client_name: string; room_name: string }>>;

    // Método responsável por buscar um agendamento específico pelo ID (para edição ou detalhes)
    findById(id: number): Promise<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "notes" | "client_id" | "room_id"> | null>;

    // Método responsável por atualizar o status (Confirmar/Cancelar - botões da grid)
    updateStatus(id: number, status: 'pending' | 'confirmed' | 'canceled'): Promise<boolean>;

    // -- REGRAS DE NEGÓCIO ESPECÍFICAS --

    // Método responsável por verificar se já existe agendamento naquele horário e sala
    // Essencial para a validação de "Bloco de Horários" antes de criar
    findConflictingAppointment(data: CheckAvailabilityDTO): Promise<Pick<AppointmentAttributes, "id" | "date_time"> | null>;

    // Método responsável por listar agendamentos de um cliente específico (Histórico do cliente)
    findByClientId(client_id: number): Promise<Array<Pick<AppointmentAttributes, "id" | "date_time" | "status" | "room_id">>>;
}