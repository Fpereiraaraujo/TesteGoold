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
exports.UpdateUserController = void 0;
const UpdateUserService_1 = require("../../services/user/UpdateUserService");
class UpdateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user_id;
            const { name, surname, zip_code, address, number, complement, neighborhood, city, state, password } = req.body;
            const service = new UpdateUserService_1.UpdateUserService();
            const user = yield service.execute({
                user_id: Number(user_id),
                name, surname, zip_code, address, number, complement, neighborhood, city, state, password
            });
            return res.json(user);
        });
    }
}
exports.UpdateUserController = UpdateUserController;
