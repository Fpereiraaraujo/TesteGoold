import { Request, Response } from "express";
import { UpdateRoomService } from "../../services/room/UpdateRoomService";

class UpdateRoomController {
  async handle(req: Request, res: Response) {
  
    const { room_id } = req.params;
    
   
    const { name, start_time, end_time } = req.body;

    const service = new UpdateRoomService();

    try {
      const room = await service.execute({
        room_id: Number(room_id),
        name,
        start_time,
        end_time
      });

      return res.json(room);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { UpdateRoomController };