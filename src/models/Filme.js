import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const Filme = sequelize.define('filmes', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    personaje_: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });