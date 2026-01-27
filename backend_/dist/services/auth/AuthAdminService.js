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
exports.AuthAdminService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User"));
const CreateLogService_1 = require("../log/CreateLogService");
class AuthAdminService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const user = yield User_1.default.findOne({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("Email ou senha incorretos");
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password_hash);
            if (!passwordMatch) {
                throw new Error("Email ou senha incorretos");
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email,
                role: user.role,
                isAdmin: user.isAdmin
            }, process.env.JWT_SECRET || "tokensecreto", {
                subject: user.id.toString(),
                expiresIn: "30d"
            });
            const createLogService = new CreateLogService_1.CreateLogService();
            yield createLogService.execute({
                user_id: user.id,
                action: "Login",
                module: "Minha Conta",
                details: `Usuário ${user.role} realizou login no sistema`
            });
            return {
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isAdmin: user.isAdmin
                }
            };
        });
    }
}
exports.AuthAdminService = AuthAdminService;
