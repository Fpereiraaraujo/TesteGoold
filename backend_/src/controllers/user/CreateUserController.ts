import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {

    const { 
      name, 
      email, 
      password,
      zip_code, 
      address, 
      number, 
      complement, 
      surname,
      neighborhood, 
      city, 
      state 
    } = req.body;

    const createUserService = new CreateUserService();


    const user = await createUserService.execute({
      name,
      email,
      password,
      zip_code,
      address,
      surname,
      number,
      complement,
      neighborhood,
      city,
      state
    });

    return res.json(user);
  }
}

export { CreateUserController };