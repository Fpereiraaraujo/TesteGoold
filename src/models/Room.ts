import { Model, DataTypes, Optional } from 'sequelize';
import {sequelize} from '../config/database';
import  Appointment  from './Appointment'; 


export interface RoomAttributes {
  id: number;
  name: string;
  start_time: string; 
  end_time: string;   
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> {}


export class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
  
  public id!: number;
  public name!: string;
  public start_time!: string;
  public end_time!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  static associate() {

    Room.hasMany(Appointment, { foreignKey: 'room_id', as: 'appointments' });
  }
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'rooms', 
    modelName: 'Room',
  }
);