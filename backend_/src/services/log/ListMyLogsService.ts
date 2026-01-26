import Log from '../../models/Log';

class ListMyLogsService {
  async execute(user_id: number) {
    const logs = await Log.findAll({
      where: {
        user_id: user_id 
      },
      order: [['createdAt', 'DESC']] 
    });

    return logs;
  }
}

export { ListMyLogsService };