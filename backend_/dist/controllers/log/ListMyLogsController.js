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
exports.ListMyLogsController = void 0;
const ListMyLogsService_1 = require("../../services/log/ListMyLogsService");
class ListMyLogsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user_id;
            const service = new ListMyLogsService_1.ListMyLogsService();
            const logs = yield service.execute(Number(user_id));
            return res.json(logs);
        });
    }
}
exports.ListMyLogsController = ListMyLogsController;
