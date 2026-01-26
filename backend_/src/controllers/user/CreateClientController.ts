import { Request, Response } from 'express';
import { CreateClientService } from '../../services/user/CreateClientService';

class CreateClientController {
  async handle(req: Request, res: Response) {
    const { name, surname, email, password, zip_code } = req.body;

    const service = new CreateClientService();

    const user = await service.execute({
      name,
      surname,
      email,
      password,
      zip_code
    });

    return res.json(user);
  }
}

export { CreateClientController };