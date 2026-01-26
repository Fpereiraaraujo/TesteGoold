import Log from '../../models/Log';

interface ILogRequest {
  user_id: number;
  action: string;
  module: string;
  details?: string;
}

class CreateLogService {
  async execute({ user_id, action, module, details }: ILogRequest) {
    const log = await Log.create({
      user_id,
      action,
      module,
      details
    });

    return log;
  }
}

export { CreateLogService };