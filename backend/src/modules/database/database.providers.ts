import { Sequelize } from 'sequelize-typescript';
import { Order } from '../order/order.entity';
import { Pizza } from '../pizza/pizza.entity';
import { Topping } from '../topping/topping.entity';
import { PizzaTopping } from '../pizza-topping/pizza-topping.entity';
import { Log } from '../logs/log.entity';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASS,
  DATABASE_PORT,
  DATABASE_USER,
} from 'src/config/env';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASS,
        database: DATABASE_NAME,
        logging: false,
      });
      sequelize.addModels([Order, Pizza, Topping, PizzaTopping, Log]);
      await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
