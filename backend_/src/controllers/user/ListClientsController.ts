import { Request, Response } from 'express';
import { ListClientsService } from '../../services/user/ListClientsService';

class ListClientsController {
  async handle(req: Request, res: Response) {
    const service = new ListClientsService();
    const clients = await service.execute();
    return res.json(clients);
  }
}

export { ListClientsController };