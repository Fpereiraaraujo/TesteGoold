import { Router } from 'express';
import { 
  CreateAppointmentController, 
  ListAppointmentsController 
} from '../controllers/appointment/CreateAppointmentController'; 

const routes = Router();


const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentsController();


routes.post(
    "/agendamentos", 
    (req, res) => createAppointmentController.handle(req, res)
);


routes.get(
    "/agendamentos", 
    (req, res) => listAppointmentsController.handle(req, res)
);

export { routes };