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
exports.CreateClientController = void 0;
const CreateClientService_1 = require("../../services/user/CreateClientService");
class CreateClientController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, surname, email, password, zip_code } = req.body;
            const service = new CreateClientService_1.CreateClientService();
            const user = yield service.execute({
                name,
                surname,
                email,
                password,
                zip_code
            });
            return res.json(user);
        });
    }
}
exports.CreateClientController = CreateClientController;
