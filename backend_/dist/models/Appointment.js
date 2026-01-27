"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Appointment extends sequelize_1.Model {
}
Appointment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    client_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    room_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'pending',
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'Appointments',
});
exports.default = Appointment;
