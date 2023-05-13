import { RepositoryName } from 'src/utils/constants';
import { Provider } from '@nestjs/common';
import { Order } from '../order/order.entity';
import { Pizza } from '../pizza/pizza.entity';
import { Topping } from '../topping/topping.entity';
import { PizzaTopping } from '../pizza-topping/pizza-topping.entity';

export const RepositoryProvider = {
  order: {
    provide: RepositoryName.ORDER,
    useValue: Order,
  },
  pizza: {
    provide: RepositoryName.PIZZA,
    useValue: Pizza,
  },
  topping: {
    provide: RepositoryName.TOPPING,
    useValue: Topping,
  },
  pizzaTopping: {
    provide: RepositoryName.PIZZA_TOPPING,
    useValue: PizzaTopping,
  },
};
