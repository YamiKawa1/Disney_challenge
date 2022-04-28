import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

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
    },
    filmes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });