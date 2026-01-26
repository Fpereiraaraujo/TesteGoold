import { Router } from 'express';
import { sequelize } from '../config/database'; // Importante para a correção do banco

// Imports dos Controllers
import { CreateAppointmentController, ListAppointmentsController } from '../controllers/appointment/CreateAppointmentController'; 

// Se você separou os arquivos, ajuste o import acima. Se estiverem juntos, mantenha assim.

import { AuthAdminController } from '../controllers/auth/AuthAdminController';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { CreateClientController } from '../controllers/user/CreateClientController';



const routes = Router();

// Instâncias dos Controllers
const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentsController();
const authAdminController = new AuthAdminController();
const createUserController = new CreateUserController();
const createClientController = new CreateClientController();


// --------------------------------------------------------------------------
// ROTAS PÚBLICAS (Qualquer um pode acessar)
// --------------------------------------------------------------------------

// Login (Admin e Cliente)
routes.post("/login", (req, res) => authAdminController.handle(req, res));
routes.post("/client/login", (req, res) => authAdminController.handle(req, res)); 

// Cadastro de Usuários (Admin)
routes.post("/users", (req, res) => createUserController.handle(req, res));

// Cadastro de Clientes (Novo)
routes.post("/client/register", (req, res) => createClientController.handle(req, res)); 


// --------------------------------------------------------------------------
// ROTAS PRIVADAS (Precisa estar logado / Token)
// --------------------------------------------------------------------------

routes.post(
    "/agendamentos", 
    (req, res) => createAppointmentController.handle(req, res)
);

routes.get(
    "/agendamentos", 
    (req, res) => listAppointmentsController.handle(req, res)
);

export { routes };