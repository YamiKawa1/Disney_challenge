import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Genero } from './Genero';
import { Film } from './Film'

export const GeneroFilm = sequelize.define('genero_film', {
    FilmId: {
        type: DataTypes.INTEGER,
        references: {
          model: Film, 
          key: 'id'
        }
      },
      GeneroId: {
        type: DataTypes.INTEGER,
        references: {
          model: Genero, 
          key: 'id'
        }
      }
});

Film.belognsToMany(Genero, { through: GeneroFilm})
Genero.belognsToMany(Film, { through: GeneroFilm})