import { Sequelize } from 'sequelize-typescript';
import { Order } from '../order/order.entity';
import { Pizza } from '../pizza/pizza.entity';
import { Topping } from '../topping/topping.entity';
import { PizzaTopping } from '../pizza-topping/pizza-topping.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'reasonlabs',
      });
      sequelize.addModels([Order, Pizza, Topping, PizzaTopping]);
      await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
