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
exports.ListClientsController = void 0;
const ListClientsService_1 = require("../../services/user/ListClientsService");
class ListClientsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listClientsService = new ListClientsService_1.ListClientsService();
            const clients = yield listClientsService.execute();
            return res.json(clients);
        });
    }
}
exports.ListClientsController = ListClientsController;
