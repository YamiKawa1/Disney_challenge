import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Film } from './Film';

export const Genero = sequelize.define('generos', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Genero.hasMany(Film)

  // Funcion para crear generos
  export const createGenre = async() =>{
    await Genero.create({
      imagen: 'https://cdn.pixabay.com/photo/2021/02/27/13/42/comedy-6054626_960_720.jpg',
      nombre: 'Comedia'
    });
  
    await Genero.create({
      imagen: 'https://cdn.pixabay.com/photo/2014/04/03/11/50/drama-312318_960_720.png',
      nombre: 'Drama'
    });
  
    await Genero.create({
      imagen: 'cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_960_720.jpg',
      nombre: 'Aventura'
    });
  
    await Genero.create({
      imagen: 'cdn.pixabay.com/photo/2021/04/20/03/40/captain-america-6192855_960_720.png',
      nombre: 'Heroes'
    });
  
    await Genero.create({
      imagen: 'cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_960_720.jpg',
      nombre: 'Animada'
    });
  }
  