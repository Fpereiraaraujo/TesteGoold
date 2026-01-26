import { Model, DataTypes, Optional } from 'sequelize'; 
import { sequelize } from '../config/database';
import { User } from './User';


export interface LogAttributes {
  id: number;
  user_id: number;
  action: string;
  module: string;
  details?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface LogCreationAttributes extends Optional<LogAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Log extends Model<LogAttributes, LogCreationAttributes> implements LogAttributes {
  public id!: number;
  public user_id!: number;
  public action!: string;
  public module!: string;
  public details!: string; 
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Log.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  }
}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'logs',
    modelName: 'Log',
  }
);

export default Log;