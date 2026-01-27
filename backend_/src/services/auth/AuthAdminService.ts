import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../../models/User'; 
import { CreateLogService } from '../log/CreateLogService'; 

interface IAuthRequest {
  email: string;
  password: string;
}

class AuthAdminService {
  async execute({ email, password }: IAuthRequest) {
    
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error("Email ou senha incorretos");
    }

   
    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
    }

   
    const token = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin 
      },
      process.env.JWT_SECRET || "tokensecreto", 
      {
        subject: user.id.toString(),
        expiresIn: "30d" 
      }
    );


    const createLogService = new CreateLogService();
    await createLogService.execute({
      user_id: user.id,
      action: "Login",
      module: "Minha Conta", 
      details: `Usuário ${user.role} realizou login no sistema`
    });

 
    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, 
        isAdmin: user.isAdmin 
      }
    };
  }
}

export { AuthAdminService };