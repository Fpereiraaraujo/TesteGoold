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
const database_1 = require("../config/database");
const Room_1 = require("../models/Room");
function createRooms() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.sequelize.authenticate();
            console.log("Conexão estabelecida.");
            const [room1, created1] = yield Room_1.Room.findOrCreate({
                where: { id: 1 },
                defaults: {
                    id: 1,
                    name: "Sala de Reunião 1",
                    start_time: "08:00",
                    end_time: "18:00"
                }
            });
            if (created1)
                console.log("Sala 1 criada.");
            else
                console.log("Sala 1 já existe.");
            const [room2, created2] = yield Room_1.Room.findOrCreate({
                where: { id: 2 },
                defaults: {
                    id: 2,
                    name: "Sala de Reunião 2",
                    start_time: "09:00",
                    end_time: "17:00"
                }
            });
            if (created2)
                console.log("Sala 2 criada.");
            else
                console.log("Sala 2 já existe.");
        }
        catch (error) {
            console.error("Erro ao criar salas:", error);
        }
        finally {
            yield database_1.sequelize.close();
        }
    });
}
createRooms();
