import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Pizza } from '../pizza/pizza.entity';
import { PizzaTopping } from '../pizza-topping/pizza-topping.entity';

@Table({ tableName: 'Toppings', underscored: true })
export class Topping extends Model {
  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  name: string;

  @BelongsToMany(() => Pizza, () => PizzaTopping)
  pizzas: Pizza[];
}
