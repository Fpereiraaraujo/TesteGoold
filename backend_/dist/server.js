"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const associations_1 = require("./models/associations");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, associations_1.initAssociations)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.routes);
app.listen(3333, () => console.log('Servidor rodando na porta 3333'));
