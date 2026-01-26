import { Router } from 'express';
import { sequelize } from '../config/database'; 
import { CreateAppointmentController, ListAppointmentsController, ListMyAppointmentsController } from '../controllers/appointment/CreateAppointmentController'; 

import { AuthAdminController } from '../controllers/auth/AuthAdminController';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { CreateClientController } from '../controllers/user/CreateClientController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ListMyLogsController } from '../controllers/log/ListMyLogsController';
import Log from '../models/Log';



const routes = Router();

const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentsController();
const authAdminController = new AuthAdminController();
const createUserController = new CreateUserController();
const createClientController = new CreateClientController();
const listMyAppointmentsController = new ListMyAppointmentsController();
const listMyLogsController = new ListMyLogsController();


routes.post("/login", (req, res) => authAdminController.handle(req, res));
routes.post("/client/login", (req, res) => authAdminController.handle(req, res)); 
routes.post("/users", (req, res) => createUserController.handle(req, res));
routes.post("/client/register", (req, res) => createClientController.handle(req, res)); 

// routes.get("/fix-logs", async (req, res) => {
//   try {
//     // O comando .sync() cria a tabela se ela não existir
//     await Log.sync({ force: false }); 
    
//     return res.send("<h1>Sucesso! Tabela 'logs' criada pelo Sequelize.</h1>");
//   } catch (erro: any) {
//     return res.status(500).json({ 
//         mensagem: "Erro ao criar tabela logs",
//         erro_tecnico: erro.message 
//     });
//   }
// });



routes.post(
  "/agendamentos", 
   isAuthenticated,
  (req, res) => createAppointmentController.handle(req, res)
);


routes.get(
  "/agendamentos", 
  isAuthenticated,
  (req, res) => listAppointmentsController.handle(req, res)
);


routes.get(
  "/agendamentos/me", 
  isAuthenticated,
  (req, res) => listMyAppointmentsController.handle(req, res)
);

routes.get(
  "/logs/me", 
  isAuthenticated, 
  (req, res) => listMyLogsController.handle(req, res)
);

export { routes };