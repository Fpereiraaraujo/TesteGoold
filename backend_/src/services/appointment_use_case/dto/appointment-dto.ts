
export interface FindAppointmentFilterDTO {
    dateStart?: Date;
    dateEnd?: Date;
    clientName?: string;
    status?: 'pending' | 'confirmed' | 'canceled';
}


export interface CreateAppointmentDTO {
    client_id: number;
    room_id: number;
    date_time: Date;
    notes?: string;
}


export interface CheckAvailabilityDTO {
    room_id: number;
    date_time_start: Date;
    date_time_end: Date;
}