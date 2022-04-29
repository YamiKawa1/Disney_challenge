import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const Personaje = sequelize.define('personajes', {
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
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  peso: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  historia: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  filmes: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

