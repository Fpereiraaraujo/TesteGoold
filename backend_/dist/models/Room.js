"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Appointment_1 = __importDefault(require("./Appointment"));
class Room extends sequelize_1.Model {
    static associate() {
        Room.hasMany(Appointment_1.default, { foreignKey: 'room_id', as: 'appointments' });
    }
}
exports.Room = Room;
Room.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    start_time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    end_time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'rooms',
    modelName: 'Room',
});
