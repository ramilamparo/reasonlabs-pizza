import { HasOne, Table, Model, Column, DataType } from 'sequelize-typescript';
import { Pizza } from '../pizza/pizza.entity';
import { OrderStatus } from 'src/utils/OrderStatus';

@Table({ tableName: 'Orders', underscored: true })
export class Order extends Model {
  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    defaultValue: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @HasOne(() => Pizza, 'orderId')
  pizza: Pizza;
}
