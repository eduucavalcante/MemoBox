import express from 'express';
import folderRoutes from './routes/folderRouter.js';
import noteRoutes from './routes/noteRouter.js';
import publicRoutes from './routes/publicRouter.js';
import auth from './middlewares/auth.js';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: 'https://memobox-notes.netlify.app/' }));

//Rotas
app.use('/', publicRoutes);
app.use('/', auth, folderRoutes);
app.use('/', auth, noteRoutes);

export default app;