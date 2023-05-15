import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules/order/order.module';
import { ToppingModule } from './modules/topping/topping.module';

@Module({
  imports: [OrderModule, ToppingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
