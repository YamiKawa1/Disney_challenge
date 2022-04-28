import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const Filme = sequelize.define('filmes', {
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
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCreacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    calificacion: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    personajes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });