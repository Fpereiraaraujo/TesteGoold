import { Request, Response } from 'express';
import { AuthAdminService } from '../../services/auth/AuthAdminService';

class AuthAdminController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authAdminService = new AuthAdminService();

    try {
      const auth = await authAdminService.execute({
        email,
        password
      });

      return res.json(auth);

    } catch (err: any) {

      return res.status(401).json({ error: err.message });
    }
  }
}

export { AuthAdminController };