import express from 'express';
import { routes } from './routes/routes';
import { initAssociations } from './models/associations';

const app = express();
initAssociations();

app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));