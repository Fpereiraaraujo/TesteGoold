import { Room } from "../../models/Room";

interface RoomRequest {
  room_id: number;
  name: string;
  start_time: string;
  end_time: string;
}

class UpdateRoomService {
  async execute({ room_id, name, start_time, end_time }: RoomRequest) {
    
    
    const room = await Room.findByPk(room_id);

    if (!room) {
      throw new Error("Sala não encontrada");
    }

   
    room.name = name;
    room.start_time = start_time;
    room.end_time = end_time;


    await room.save();

    return room;
  }
}

export { UpdateRoomService };