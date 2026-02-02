import User from '../../models/User';
import { hash } from 'bcryptjs';

interface IUserRequest {
  name: string;

  email: string;
  password: string;
 
  zip_code?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  surname?:string
}

class CreateUserService {
 
  async execute({ 
    name, 
    surname,
    email, 
    password, 
    zip_code, 
    address, 
    number, 
    complement, 
    neighborhood, 
    city, 
    state 
  }: IUserRequest) {
    
   
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
      surname:surname,
      zip_code: zip_code,
      address: address,
      number: number,
      complement: complement,
      neighborhood: neighborhood,
      city: city,
      state: state,
    });

    return user;
  }
}

export { CreateUserService };