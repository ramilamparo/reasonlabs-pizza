import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { RepositoryProvider } from '../database/repository.providers';
import { RestaurantService } from '../restaurant/restaurant.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    RestaurantService,
    RepositoryProvider.order,
    RepositoryProvider.pizza,
  ],
})
export class OrderModule {}
