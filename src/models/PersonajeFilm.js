import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Personaje } from './Personaje';
import { Film } from './Film';

export const PersonajeFilm = sequelize.define('personaje_film', {
    PersonajeId: {
        type: DataTypes.INTEGER,
        references: {
          model: Personaje, 
          key: 'id'
        }
      },
      FilmId: {
        type: DataTypes.INTEGER,
        references: {
          model: Film, 
          key: 'id'
        }
      }
});

Personaje.belognsToMany(Film, { through: PersonajeFilm})
Film.belognsToMany(Personaje, { through: PersonajeFilm})