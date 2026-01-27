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
exports.ListClientsService = void 0;
const User_1 = __importDefault(require("../../models/User"));
class ListClientsService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield User_1.default.findAll({
                where: {
                    role: 'client'
                },
                attributes: [
                    'id', 'name', 'email', 'status', 'createdAt',
                    'address', 'number', 'neighborhood', 'city', 'state'
                ],
                order: [['createdAt', 'DESC']]
            });
            return clients;
        });
    }
}
exports.ListClientsService = ListClientsService;
