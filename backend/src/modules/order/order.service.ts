import { Inject, Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderDto } from './dto/order.dto';
import { Pizza } from '../pizza/pizza.entity';
import { Topping } from '../topping/topping.entity';
import { RepositoryName } from 'src/utils/constants';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(RepositoryName.ORDER)
    private orderRepository: typeof Order,
    @Inject(RepositoryName.PIZZA)
    private pizzaRepository: typeof Pizza,
    private restaurantService: RestaurantService,
  ) {}

  async create(data: OrderDto) {
    const order = await this.orderRepository.create();
    const pizza = await this.pizzaRepository.create({ orderId: order.id });
    await pizza.$add('toppings', data.toppingIds);
    this.restaurantService.processNewOrder(order);
    return order;
  }

  async getAll() {
    const orders = await this.orderRepository.findAll({
      include: [
        {
          model: Pizza,
          include: [
            {
              model: Topping,
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    return orders;
  }
}
