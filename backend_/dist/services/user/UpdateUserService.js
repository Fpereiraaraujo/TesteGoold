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
exports.UpdateUserService = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = require("bcryptjs");
const CreateLogService_1 = require("../log/CreateLogService");
class UpdateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, name, surname, zip_code, address, number, complement, neighborhood, city, state, password }) {
            const user = yield User_1.default.findByPk(user_id);
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            user.name = name;
            user.surname = surname;
            user.zip_code = zip_code;
            user.address = address;
            user.number = number;
            user.complement = complement;
            user.neighborhood = neighborhood;
            user.city = city;
            user.state = state;
            if (password) {
                user.password_hash = yield (0, bcryptjs_1.hash)(password, 8);
            }
            yield user.save();
            const createLogService = new CreateLogService_1.CreateLogService();
            yield createLogService.execute({
                user_id: user.id,
                action: "Atualização de perfil",
                module: "Minha Conta",
                details: "Usuário atualizou seus dados cadastrais"
            });
            return user;
        });
    }
}
exports.UpdateUserService = UpdateUserService;
