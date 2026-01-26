import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/user/UpdateUserService';

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const { name, surname, zip_code, address, number, complement, neighborhood, city, state, password } = req.body;

    const service = new UpdateUserService();

    const user = await service.execute({
      user_id: Number(user_id),
      name, surname, zip_code, address, number, complement, neighborhood, city, state, password
    });

    return res.json(user);
  }
}
export { UpdateUserController };