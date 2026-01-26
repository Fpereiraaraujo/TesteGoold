import { Request, Response } from 'express';
import { ListAllLogsService } from '../../services/log/ListAllLogsService';

class ListAllLogsController {
  async handle(req: Request, res: Response) {
    const service = new ListAllLogsService();
    const logs = await service.execute();
    return res.json(logs);
  }
}

export { ListAllLogsController };