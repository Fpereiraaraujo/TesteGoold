"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        console.log("DEBUG: Sem token no cabeçalho");
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || "tokensecreto");
        console.log("DEBUG: Token decodificado, ID:", sub);
        req.user_id = sub;
        return next();
    }
    catch (err) {
        console.log("DEBUG: Erro ao validar token:", err);
        return res.status(401).end();
    }
}
