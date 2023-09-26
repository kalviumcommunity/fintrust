import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'fintrust',
  username: 'root',
  password: '28082004@Ayush',
  host: '127.0.0.1',
  dialect: 'mysql',
});

export default sequelize;