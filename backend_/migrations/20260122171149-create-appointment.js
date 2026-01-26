'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // --- VÍNCULO COM O CLIENTE (USUÁRIO) ---
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Importante: Nome exato da tabela no Banco (Maiúsculo)
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      // --- VÍNCULO COM A SALA ---
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Rooms', // Importante: Nome exato da tabela no Banco (Maiúsculo)
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      // --- DATA E HORA ---
      date_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      // --- OBSERVAÇÕES ---
      notes: {
        type: Sequelize.TEXT, // Texto longo para observações
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending' // Valor padrão se não for enviado
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments');
  }
};