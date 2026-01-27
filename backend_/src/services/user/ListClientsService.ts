import User from "../../models/User";

class ListClientsService {
  async execute() {

    const clients = await User.findAll({
      where: {
        role: 'client' 
      },
      attributes: [
        'id', 'name', 'email', 'status', 'createdAt', 
        'address', 'number', 'neighborhood', 'city', 'state' 
      ], 
      order: [['createdAt', 'DESC']]
    });

    return clients;
  }
}

export { ListClientsService };