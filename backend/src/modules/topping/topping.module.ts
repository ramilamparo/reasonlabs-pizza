import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ToppingController } from './topping.controller';
import { ToppingService } from './topping.service';
import { RepositoryProvider } from '../database/repository.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ToppingController],
  providers: [ToppingService, RepositoryProvider.topping],
})
export class ToppingModule {}
