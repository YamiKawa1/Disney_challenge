import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import authRoutes from './components/auth/auth.routes'
import characterRoutes from './components/character/character.routes'
import filmRoutes from './components/film/film.routes'

const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/auth', authRoutes);
app.use('/character', characterRoutes);
app.use('/movies', filmRoutes);



export default app;