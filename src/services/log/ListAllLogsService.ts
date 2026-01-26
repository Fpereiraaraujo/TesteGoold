import Log from '../../models/Log';
import User from '../../models/User';

class ListAllLogsService {
  async execute() {
    const logs = await Log.findAll({
      include: [
        {
          model: User, 
          as: 'user', 
          attributes: ['name', 'email', 'role'] 
        }
      ],
      order: [['createdAt', 'DESC']] 
    });

    return logs;
  }
}

export { ListAllLogsService };