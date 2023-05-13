import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules/order/order.module';
import { ConfigModule } from '@nestjs/config';
import { ToppingModule } from './modules/topping/topping.module';

@Module({
  imports: [ConfigModule.forRoot(), OrderModule, ToppingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
