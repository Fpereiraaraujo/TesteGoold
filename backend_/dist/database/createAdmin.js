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
require("dotenv/config");
const bcryptjs_1 = require("bcryptjs");
const database_1 = require("../config/database");
const User_1 = __importDefault(require("../models/User"));
function createAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.sequelize.authenticate();
            console.log("Conexão com banco estabelecida.");
            const adminExists = yield User_1.default.findOne({
                where: { email: "admin@goldspell.com" }
            });
            if (adminExists) {
                console.log(" O Admin já existe!");
                return;
            }
            const passwordHash = yield (0, bcryptjs_1.hash)("123456", 8);
            yield User_1.default.create({
                name: "Admin Master",
                email: "admin@goldspell.com",
                password_hash: passwordHash,
                role: "admin",
                isAdmin: true
            });
            console.log("✅ Admin criado com sucesso!");
        }
        catch (error) {
            console.error("Erro ao criar admin:", error);
        }
        finally {
            yield database_1.sequelize.close();
        }
    });
}
createAdmin();
