import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Pizza } from '../pizza/pizza.entity';
import { PizzaTopping } from '../pizza-topping/pizza-topping.entity';
import { ToppingStatus } from 'src/utils/ToppingStatus';

@Table({ tableName: 'Toppings', underscored: true })
export class Topping extends Model {
  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  name: string;

  @Column({
    type: DataType.ENUM(...Object.values(ToppingStatus)),
    defaultValue: ToppingStatus.PENDING,
  })
  status: ToppingStatus;

  @BelongsToMany(() => Pizza, () => PizzaTopping)
  pizzas: Pizza[];
}
