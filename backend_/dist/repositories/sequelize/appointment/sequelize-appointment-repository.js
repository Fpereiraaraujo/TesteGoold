"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeAppointmentRepository = void 0;
const sequelize_1 = require("sequelize");
const Appointment_1 = __importDefault(require("../../../models/Appointment"));
const User_1 = require("../../../models/User");
const Room_1 = require("../../../models/Room");
class SequelizeAppointmentRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield Appointment_1.default.create(data);
            return appointment.toJSON();
        });
    }
    findAllByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereClause = {};
            if (filter.status) {
                whereClause.status = filter.status;
            }
            if (filter.dateStart && filter.dateEnd) {
                whereClause.date_time = {
                    [sequelize_1.Op.between]: [filter.dateStart, filter.dateEnd]
                };
            }
            else if (filter.dateStart) {
                whereClause.date_time = { [sequelize_1.Op.gte]: filter.dateStart };
            }
            const appointments = yield Appointment_1.default.findAll({
                where: whereClause,
                include: [
                    {
                        model: User_1.User,
                        as: 'client',
                        attributes: ['name'],
                        where: filter.clientName ? { name: { [sequelize_1.Op.like]: `%${filter.clientName}%` } } : undefined
                    },
                    {
                        model: Room_1.Room,
                        as: 'room',
                        attributes: ['name']
                    }
                ],
                order: [['date_time', 'ASC']]
            });
            return appointments.map((appt) => {
                var _a, _b;
                return ({
                    id: appt.id,
                    date_time: appt.date_time,
                    status: appt.status,
                    notes: appt.notes,
                    client_name: ((_a = appt.client) === null || _a === void 0 ? void 0 : _a.name) || 'Cliente Desconhecido',
                    room_name: ((_b = appt.room) === null || _b === void 0 ? void 0 : _b.name) || 'Sala N/A'
                });
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Appointment_1.default.findByPk(id);
        });
    }
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const [affectedCount] = yield Appointment_1.default.update({ status: status }, { where: { id } });
            return affectedCount > 0;
        });
    }
    findConflictingAppointment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Appointment_1.default.findOne({
                where: {
                    room_id: data.room_id,
                    date_time: {
                        [sequelize_1.Op.between]: [data.date_time_start, data.date_time_end]
                    },
                    status: { [sequelize_1.Op.not]: 'canceled' }
                },
                attributes: ['id', 'date_time']
            });
        });
    }
    findByClientId(client_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Appointment_1.default.findAll({
                where: { client_id },
                order: [['date_time', 'DESC']]
            });
        });
    }
}
exports.SequelizeAppointmentRepository = SequelizeAppointmentRepository;
