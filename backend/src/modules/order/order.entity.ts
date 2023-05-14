import { HasOne, Table, Model, HasMany } from 'sequelize-typescript';
import { Pizza } from '../pizza/pizza.entity';
import { Log } from '../logs/log.entity';

@Table({ tableName: 'Orders', underscored: true })
export class Order extends Model {
  @HasOne(() => Pizza, 'orderId')
  pizza: Pizza;

  @HasMany(() => Log, 'moduleId')
  logs: Log[];
}
