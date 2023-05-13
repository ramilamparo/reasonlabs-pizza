import { Body, Controller, Get, Post } from '@nestjs/common';
import { ToppingService } from './topping.service';
import { ToppingDto } from './dto/topping.dto';

@Controller('/toppings')
export class ToppingController {
  constructor(private readonly toppingService: ToppingService) {}

  @Post()
  create(@Body() body: ToppingDto) {
    return this.toppingService.create(body);
  }

  @Get()
  getAll() {
    return this.toppingService.getAll();
  }
}
