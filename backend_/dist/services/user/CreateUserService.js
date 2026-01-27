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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const User_1 = require("../../models/User");
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            const userAlreadyExists = yield User_1.User.findOne({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists) {
                throw new Error("User already exists");
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            const user = yield User_1.User.create({
                name: name,
                email: email,
                password_hash: passwordHash,
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
