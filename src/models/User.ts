import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; 
import Appointment from './Appointment';

export interface UserAttributes {
  id: number;
  name: string;
  surname?: string; // Novo
  email: string;
  password_hash: string;
  zip_code?: string; // Novo
  role: 'admin' | 'client';
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'status'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public surname!: string; // Novo
  public email!: string;
  public password_hash!: string;
  public zip_code!: string; // Novo
  public role!: 'admin' | 'client';
  public status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    User.hasMany(Appointment, { foreignKey: 'client_id', as: 'appointments' });
  }
}

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
    surname: { // Novo
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      // Lembre-se: removemos o 'field: password' porque sua coluna no banco já chama password_hash
    },
    zip_code: { // Novo
      type: DataTypes.STRING,
      allowNull: true,
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
    sequelize,
    tableName: 'users',
    modelName: 'User',
  }
);

export default User;