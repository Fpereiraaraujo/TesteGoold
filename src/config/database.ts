import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// 1. Carrega as variáveis do arquivo .env
dotenv.config();

// 2. Cria a conexão usando as variáveis
export const sequelize = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // O SEGREDO ESTÁ AQUI: Precisamos garantir que ele pegue a porta 3308
    port: Number(process.env.DB_PORT) || 3306, 
    timezone: '-03:00', // Configura para horário do Brasil
    logging: console.log, // Isso vai mostrar no terminal onde ele está conectando
  }
);