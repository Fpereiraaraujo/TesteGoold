import Appointment from './Appointment';
import { Room } from './Room';
import { User } from './User';

export function initAssociations() {
  Appointment.belongsTo(User, { foreignKey: 'client_id', as: 'client' });

  Appointment.belongsTo(Room, { foreignKey: 'room_id', as: 'room' });
}