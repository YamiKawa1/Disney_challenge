import app from "./app";
import {sequelize} from './database'
import './models/Personaje'
import './models/Genero'
import './models/User'
import './models/Film'


app.listen(2000, async () => {
    // Cambiar esto una vez deje de haber cambios en la base de datos 
    await sequelize.sync({force: true})
    console.log('listening on port', 2000);
})