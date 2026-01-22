import { Model, DataTypes, Optional } from 'sequelize';
import {sequelize} from '../config/database'; // Sua conexão
import  Appointment  from './Appointment'; // Importamos para a associação

// 1. Interface: Todos os atributos que existem no banco
export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  address?: string; // '?' pois pode ser nulo se não for obrigatório
  role: 'admin' | 'client';
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Interface de Criação: Quais campos são opcionais ao criar um novo User?
// id (auto-increment), role (tem default), status (tem default), datas (automáticas)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'status' | 'address'> {}

// 3. A Classe do Model
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  
  public id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public address!: string;
  public role!: 'admin' | 'client';
  public status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associação
  static associate() {
    // Um usuário tem muitos agendamentos
    // Nota: O 'as' deve bater com o que você usa no 'include' do Repository
    User.hasMany(Appointment, { foreignKey: 'client_id', as: 'appointments' });
  }
}

// 4. Inicialização
User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true, // Pode ser nulo
    },
    role: {
      type: DataTypes.ENUM('admin', 'client'),
      defaultValue: 'client',
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize, // Instância da conexão
    tableName: 'users',
    modelName: 'User',
  }
);