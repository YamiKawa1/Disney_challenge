import Sequelize from 'sequelize';
import env from './env';

// const sequelize = new Sequelize('sqlite::memory:');

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../DisneyDB.db'
  });

  const DBWorking = async() => {
    try {
        const algomas = await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
DBWorking()