import { Model, DataTypes } from 'sequelize'; 
import {sequelize} from '../config/database'; 

class Appointment extends Model {
  public id!: number;
  public client_id!: number;   
  public room_id!: number;     
  public date_time!: Date;     
  public notes!: string;      
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    client_id: {              
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room_id: {                 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: {                   
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'Appointments', 
  }
);

export default Appointment;