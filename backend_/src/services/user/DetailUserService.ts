import User from '../../models/User';

class DetailUserService {
  async execute(user_id: number) {
    const user = await User.findByPk(user_id, {
      attributes: [
        'id', 'name', 'surname', 'email', 'zip_code', 
        'address', 'number', 'complement', 'neighborhood', 'city', 'state'
      ] 
    });

    return user;
  }
}

export { DetailUserService };