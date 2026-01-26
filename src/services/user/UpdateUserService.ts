import User from '../../models/User';
import { hash } from 'bcryptjs';
import { CreateLogService } from '../log/CreateLogService'; 

interface IUserUpdate {
  user_id: number;
  name: string;
  surname: string;
  zip_code: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  password?: string;
}

class UpdateUserService {
  async execute({ user_id, name, surname, zip_code, address, number, complement, neighborhood, city, state, password }: IUserUpdate) {
    
    const user = await User.findByPk(user_id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

   
    user.name = name;
    user.surname = surname;
    user.zip_code = zip_code;
    user.address = address;
    user.number = number;
    user.complement = complement;
    user.neighborhood = neighborhood;
    user.city = city;
    user.state = state;

   
    if (password) {
      user.password_hash = await hash(password, 8);
    }

    await user.save();

    
    const createLogService = new CreateLogService();
    await createLogService.execute({
      user_id: user.id,
      action: "Atualização de perfil",
      module: "Minha Conta",
      details: "Usuário atualizou seus dados cadastrais"
    });
    

    return user;
  }
}

export { UpdateUserService };