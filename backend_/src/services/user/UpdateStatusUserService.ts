import User from '../../models/User';

interface Request {
  user_id: number;
  status: boolean;
}

class UpdateStatusUserService {
  async execute({ user_id, status }: Request) {
    
    const user = await User.findByPk(user_id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

   
    user.status = status;
    await user.save();

    return user;
  }
}

export { UpdateStatusUserService };