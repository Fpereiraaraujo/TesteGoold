import { Router } from 'express';
import { sequelize } from '../config/database'; 
import { CreateAppointmentController, ListAppointmentsController, ListMyAppointmentsController } from '../controllers/appointment/CreateAppointmentController'; 

import { AuthAdminController } from '../controllers/auth/AuthAdminController';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { CreateClientController } from '../controllers/user/CreateClientController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ListMyLogsController } from '../controllers/log/ListMyLogsController';
import Log from '../models/Log';
import { DetailUserController } from '../controllers/user/DetailUserController';
import { UpdateUserController } from '../controllers/user/UpdateUserController';
import { ListClientsController } from '../controllers/user/ListClientsController';
import { ListAllLogsController } from '../controllers/log/ListAllLogsController';
import { UpdateAppointmentStatusController } from '../controllers/appointment/UpdateAppointmentStatusController';
import { UpdateRoomController } from '../controllers/room/UpdateRoomController';



const routes = Router();

const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentsController();
const authAdminController = new AuthAdminController();
const createUserController = new CreateUserController();
const createClientController = new CreateClientController();
const listMyAppointmentsController = new ListMyAppointmentsController();
const listMyLogsController = new ListMyLogsController();
const detailUserController = new DetailUserController();
const updateUserController = new UpdateUserController();
const listClientsController = new ListClientsController();
const listAllLogsController = new ListAllLogsController();
const updateAppointmentStatusController = new UpdateAppointmentStatusController();
const updateRoomController = new UpdateRoomController();



routes.post("/login", (req, res) => authAdminController.handle(req, res));
routes.post("/client/login", (req, res) => authAdminController.handle(req, res)); 
routes.post("/users", (req, res) => createUserController.handle(req, res));
routes.post("/client/register", (req, res) => createClientController.handle(req, res)); 



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

routes.get("/me", isAuthenticated, (req, res) => detailUserController.handle(req, res)); 
routes.put("/me", isAuthenticated, (req, res) => updateUserController.handle(req, res));

routes.get(
  "/clients", 
  isAuthenticated, 
  (req, res) => listClientsController.handle(req, res)
);

routes.get(
  "/logs", 
  isAuthenticated, 
  (req, res) => listAllLogsController.handle(req, res)
);

routes.put(
  "/agendamentos/status", 
  isAuthenticated, 
  (req, res) => updateAppointmentStatusController.handle(req, res)
);

routes.put('/rooms/:room_id', isAuthenticated, (req, res) => updateRoomController.handle(req, res));

export { routes };