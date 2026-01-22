import { Model, DataTypes, Optional } from 'sequelize';
import {sequelize} from '../config/database';
import  Appointment  from './Appointment'; // Importar para a associação

// 1. Interface dos atributos que existem no banco
export interface RoomAttributes {
  id: number;
  name: string;
  start_time: string; // Ex: "08:00"
  end_time: string;   // Ex: "18:00"
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Interface de criação (ID é opcional)
export interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> {}

// 3. Classe do Model
export class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
  
  public id!: number;
  public name!: string;
  public start_time!: string;
  public end_time!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associações
  static associate() {
    // Uma Sala pode ter vários Agendamentos
    // O 'as' deve ser 'appointments' (plural) pois é hasMany
    Room.hasMany(Appointment, { foreignKey: 'room_id', as: 'appointments' });
  }
}

// 4. Inicialização
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
    tableName: 'rooms', // Nome da tabela no banco
    modelName: 'Room',
  }
);