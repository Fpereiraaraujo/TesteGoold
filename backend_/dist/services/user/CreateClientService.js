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
exports.CreateClientService = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = require("bcryptjs");
class CreateClientService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, surname, email, password, zip_code }) {
            const userAlreadyExists = yield User_1.default.findOne({
                where: { email: email }
            });
            if (userAlreadyExists) {
                throw new Error("Este e-mail já está cadastrado.");
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            const user = yield User_1.default.create({
                name: name,
                surname: surname,
                email: email,
                password_hash: passwordHash,
                zip_code: zip_code,
                role: 'client',
                status: true
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
        });
    }
}
exports.CreateClientService = CreateClientService;
