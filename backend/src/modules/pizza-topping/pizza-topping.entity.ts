import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Pizza } from '../pizza/pizza.entity';
import { Topping } from '../topping/topping.entity';

@Table({ tableName: 'PizzaToppings', underscored: true })
export class PizzaTopping extends Model {
  @ForeignKey(() => Pizza)
  @Column({ allowNull: false })
  pizzaId: number;

  @ForeignKey(() => Topping)
  @Column({ allowNull: false })
  toppingId: number;

  @Column({ type: DataType.DATE })
  completedAt: Date | null;
}
