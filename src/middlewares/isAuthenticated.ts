// import { NextFunction, Request, Response } from 'express';
// import { verify } from 'jsonwebtoken';

// interface IPayload {
//   sub: string; // O ID do usuário que guardamos no token
// }

// export function isAuthenticated(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ){


//   const authToken = req.headers.authorization;

//   if(!authToken){
//     return res.status(401).end(); 
//   }

 
//   const [, token] = authToken.split(" ");

//   try{
//     // 3. Validar o token
//     const { sub } = verify(
//       token,
//       process.env.JWT_SECRET || "seusegredo123" 
//     ) as IPayload;

    
//     req.user_id = sub;

//     return next(); 

//   }catch(err){
//     return res.status(401).end();
//   }
// }