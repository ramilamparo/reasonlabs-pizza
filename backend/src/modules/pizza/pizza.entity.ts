import {
  HasMany,
  Table,
  Model,
  BelongsToMany,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Topping } from '../topping/topping.entity';
import { PizzaTopping } from '../pizza-topping/pizza-topping.entity';
import { Order } from '../order/order.entity';

@Table({ tableName: 'Pizzas', underscored: true })
export class Pizza extends Model {
  @ForeignKey(() => Order)
  @Column({ allowNull: false })
  orderId: number;

  @BelongsTo(() => Order, 'orderId')
  order: Order;

  @BelongsToMany(() => Topping, () => PizzaTopping)
  toppings: Topping[];
}
