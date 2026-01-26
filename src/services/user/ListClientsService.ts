import User from '../../models/User';

class ListClientsService {
  async execute() {
    const clients = await User.findAll({
      where: {
        role: 'client' 
      },
      attributes: ['id', 'name', 'surname', 'email', 'zip_code', 'city', 'status', 'createdAt'], 
      order: [['createdAt', 'DESC']]
    });

    return clients;
  }
}

export { ListClientsService };