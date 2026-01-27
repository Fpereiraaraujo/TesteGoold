"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAssociations = initAssociations;
const Appointment_1 = __importDefault(require("./Appointment"));
const Room_1 = require("./Room");
const User_1 = require("./User");
function initAssociations() {
    Appointment_1.default.belongsTo(User_1.User, { foreignKey: 'client_id', as: 'client' });
    Appointment_1.default.belongsTo(Room_1.Room, { foreignKey: 'room_id', as: 'room' });
}
