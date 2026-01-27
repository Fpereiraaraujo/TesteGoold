import { Request, Response } from "express";
import { ListAllLogsService } from "../../services/log/ListAllLogsService";

class ListAllLogsController {
  async handle(req: Request, res: Response) {
    const listAllLogsService = new ListAllLogsService();

    const logs = await listAllLogsService.execute();

    return res.json(logs);
  }
}

export { ListAllLogsController };