import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../../models/User'; 

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

    // 2. Verificar a senha
    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
    }

   
    const token = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || "tokensecreto", 
      {
        subject: user.id.toString(),
        expiresIn: "1d"
      }
    );

 
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, 
      token: token
    };
  }
}

export { AuthAdminService };