import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Personaje } from './Personaje';
import { Film } from './Film';

export const PersonajeFilm = sequelize.define('personaje_film', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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

Personaje.belongsToMany(Film, { through: PersonajeFilm, foreignKey: 'id'})
Film.belongsToMany(Personaje, { through: PersonajeFilm, foreignKey: 'id'})