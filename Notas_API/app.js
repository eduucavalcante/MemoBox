import express from 'express';
import folderRoutes from './routes/folderRouter.js';
import noteRoutes from './routes/noteRouter.js';
import cors from 'cors';

const app = express();
const PORT = 8081;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Rotas
app.use('/', folderRoutes);
app.use('/', noteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na URL http://localhost:${PORT}/`);
});