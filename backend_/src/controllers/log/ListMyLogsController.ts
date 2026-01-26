import { Request, Response } from 'express';
import { ListMyLogsService } from '../../services/log/ListMyLogsService';

class ListMyLogsController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id; 

    const service = new ListMyLogsService();

    const logs = await service.execute(Number(user_id));

    return res.json(logs);
  }
}

export { ListMyLogsController };