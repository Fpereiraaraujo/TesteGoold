import 'dotenv/config';
import { hash } from "bcryptjs";
import { sequelize } from "../config/database"; 
import User from "../models/User"; 

async function createAdmin() {
  try {
   
    await sequelize.authenticate();
    console.log("Conexão com banco estabelecida.");


    const adminExists = await User.findOne({
      where: { email: "admin@goldspell.com" }
    });

    if (adminExists) {
      console.log(" O Admin já existe!");
      return;
    }

    
    const passwordHash = await hash("123456", 8);

   
    await User.create({
      name: "Admin Master",
      email: "admin@goldspell.com",
      password_hash: passwordHash, 
      role: "admin",        
      isAdmin: true          
    });

    console.log("✅ Admin criado com sucesso!");

  } catch (error) {
    console.error("Erro ao criar admin:", error);
  } finally {
   
    await sequelize.close();
  }
}

createAdmin();
