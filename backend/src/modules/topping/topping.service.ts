import { Inject, Injectable } from '@nestjs/common';
import { ToppingDto } from './dto/topping.dto';
import { Topping } from './topping.entity';
import { RepositoryName } from 'src/utils/constants';

@Injectable()
export class ToppingService {
  constructor(
    @Inject(RepositoryName.TOPPING)
    private toppingRepository: typeof Topping,
  ) {}

  async create(data: ToppingDto) {
    const topping = await this.toppingRepository.create({ name: data.name });
    return topping;
  }

  async getAll() {
    const toppings = await this.toppingRepository.findAll();

    return toppings;
  }
}
