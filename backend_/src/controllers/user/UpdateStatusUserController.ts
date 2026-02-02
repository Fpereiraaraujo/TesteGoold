import { Request, Response } from 'express';
import { UpdateStatusUserService } from '../../services/user/UpdateStatusUserService';

class UpdateStatusUserController {
  async handle(req: Request, res: Response) {
    const { user_id, status } = req.body;

    const service = new UpdateStatusUserService();

    const user = await service.execute({
      user_id: Number(user_id), 
      status: Boolean(status)   
    });

    return res.json(user);
  }
}

export { UpdateStatusUserController };