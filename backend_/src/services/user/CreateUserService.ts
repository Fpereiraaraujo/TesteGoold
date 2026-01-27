import {User} from '../../models/User';
import { hash } from 'bcryptjs';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: IUserRequest) {
    
    const userAlreadyExists = await User.findOne({
      where: {
        email: email
      }
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await User.create({
      name: name,
      email: email,
      password_hash: passwordHash, 
    });

    return user;
  }
}

export { CreateUserService };