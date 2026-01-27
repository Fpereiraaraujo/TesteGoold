import User from '../../models/User'; 
import { hash } from 'bcryptjs';

interface IClientRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  zip_code: string;
}

class CreateClientService {
  async execute({ name, surname, email, password, zip_code }: IClientRequest) {
    
    
    const userAlreadyExists = await User.findOne({
      where: { email: email }
    });

    if (userAlreadyExists) {
      throw new Error("Este e-mail já está cadastrado.");
    }

    
    const passwordHash = await hash(password, 8);

   
    const user = await User.create({
      name: name,
      surname: surname,
      email: email,
      password_hash: passwordHash,
      zip_code: zip_code,
      role: 'client', 
      status: true
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
}

export { CreateClientService };