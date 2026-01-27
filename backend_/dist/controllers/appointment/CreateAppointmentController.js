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
exports.ListMyAppointmentsController = exports.CreateAppointmentController = exports.ListAppointmentsController = void 0;
const zod_1 = require("zod");
const make_create_appointment_use_case_1 = require("../../services/factories/appointment_make/make-create-appointment-use-case");
const Appointment_1 = __importDefault(require("../../models/Appointment"));
const User_1 = require("../../models/User");
const Room_1 = require("../../models/Room");
class ListAppointmentsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield Appointment_1.default.findAll({
                    include: [
                        { model: User_1.User, as: 'client', attributes: ['name', 'email'] },
                        { model: Room_1.Room, as: 'room', attributes: ['name'] }
                    ]
                });
                return res.json(appointments);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao buscar agendamentos" });
            }
        });
    }
}
exports.ListAppointmentsController = ListAppointmentsController;
class CreateAppointmentController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const createAppointmentBodySchema = zod_1.z.object({
                    room_id: zod_1.z.number(),
                    date_time: zod_1.z.coerce.date(),
                    notes: zod_1.z.string().optional()
                });
                const bodyZod = createAppointmentBodySchema.parse(body);
                const userIdFromToken = req.user_id;
                const createAppointmentUseCase = yield (0, make_create_appointment_use_case_1.makeCreateAppointmentUseCase)();
                const result = yield createAppointmentUseCase.execute(Object.assign(Object.assign({}, bodyZod), { client_id: Number(userIdFromToken) }));
                return res.status(201).json({
                    success: true,
                    hasError: false,
                    error: null,
                    data: result
                });
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    return res.status(400).json({
                        success: false,
                        hasError: true,
                        error: error.issues.map((issue) => issue.message),
                        data: null,
                    });
                }
                return res.status(400).json({
                    success: false,
                    hasError: true,
                    error: error.message || "Erro inesperado.",
                    data: null,
                });
            }
        });
    }
}
exports.CreateAppointmentController = CreateAppointmentController;
class ListMyAppointmentsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client_id = req.user_id;
                const appointments = yield Appointment_1.default.findAll({
                    where: {
                        client_id: Number(client_id)
                    },
                    include: [
                        { model: Room_1.Room, as: 'room', attributes: ['name'] },
                    ],
                    order: [['date_time', 'DESC']]
                });
                return res.json(appointments);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao buscar seus agendamentos" });
            }
        });
    }
}
exports.ListMyAppointmentsController = ListMyAppointmentsController;
