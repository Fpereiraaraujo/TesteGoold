import { sequelize } from "../config/database"; 
import { Room } from "../models/Room"; 

async function createRooms() {
  try {
    await sequelize.authenticate();
    console.log("Conexão estabelecida.");

    // Tenta achar ou criar a Sala 1
    const [room1, created1] = await Room.findOrCreate({
      where: { id: 1 },
      defaults: {
        id: 1,
        name: "Sala de Reunião 1",
        start_time: "08:00", 
        end_time: "18:00"   
      }
    });

    if (created1) console.log("Sala 1 criada.");
    else console.log("Sala 1 já existe.");

   
    const [room2, created2] = await Room.findOrCreate({
      where: { id: 2 },
      defaults: {
        id: 2,
        name: "Sala de Reunião 2",
        start_time: "09:00",
        end_time: "17:00"
      }
    });

    if (created2) console.log("Sala 2 criada.");
    else console.log("Sala 2 já existe.");

  } catch (error) {
    console.error("Erro ao criar salas:", error);
  } finally {
    await sequelize.close();
  }
}

createRooms();