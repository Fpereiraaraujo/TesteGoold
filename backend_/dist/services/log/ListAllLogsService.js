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
exports.ListAllLogsService = void 0;
const Log_1 = __importDefault(require("../../models/Log"));
const User_1 = __importDefault(require("../../models/User"));
class ListAllLogsService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const logs = yield Log_1.default.findAll({
                include: [
                    {
                        model: User_1.default,
                        as: 'user',
                        attributes: ['id', 'name', 'email']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
            return logs;
        });
    }
}
exports.ListAllLogsService = ListAllLogsService;
