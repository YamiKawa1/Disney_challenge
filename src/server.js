import app from "./app";
import {sequelize} from './database'
import './models/Personaje'
import './models/Genero'
import './models/User'
import './models/Film'
import './models/PersonajeFilm'

import { createGenre } from './models/Genero';


app.listen(2000, async () => {
    // Cambiar esto una vez deje de haber cambios en la base de datos 
    // await sequelize.sync()
    await sequelize.sync({force: true})
    await createGenre()
    console.log('listening on port', 2000);
})