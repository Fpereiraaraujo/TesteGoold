import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
){
  const authToken = req.headers.authorization;

  if(!authToken){
    console.log("DEBUG: Sem token no cabeçalho");
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try{
    const { sub } = verify(
      token,
      process.env.JWT_SECRET || "tokensecreto" 
    ) as IPayload;

    console.log("DEBUG: Token decodificado, ID:", sub); 

    
    req.user_id = sub;

    return next();

  }catch(err){
    console.log("DEBUG: Erro ao validar token:", err); 
    return res.status(401).end();
  }
}