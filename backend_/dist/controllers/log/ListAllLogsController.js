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
exports.ListAllLogsController = void 0;
const ListAllLogsService_1 = require("../../services/log/ListAllLogsService");
class ListAllLogsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listAllLogsService = new ListAllLogsService_1.ListAllLogsService();
            const logs = yield listAllLogsService.execute();
            return res.json(logs);
        });
    }
}
exports.ListAllLogsController = ListAllLogsController;
