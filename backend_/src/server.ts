import express from 'express';
import { routes } from './routes/routes';
import { initAssociations } from './models/associations';
import cors from 'cors';

const app = express();
initAssociations();

app.use(express.json());

app.use(cors());

app.use(routes);

app.listen(3333, () => console.log('Servidor rodando na porta 3333'));