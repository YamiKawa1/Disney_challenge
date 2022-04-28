import app from "./app";
import {sequelize} from './database'
import './models/Personaje'
import './models/Genero'
import './models/User'
import './models/Filme'


app.listen(2000, async () => {
    await sequelize.sync({force: true})
    console.log('listening on port', 2000);
})