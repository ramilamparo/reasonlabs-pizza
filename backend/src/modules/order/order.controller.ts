import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAll() {
    return this.orderService.getAll();
  }

  @Post()
  create(@Body() body: OrderDto) {
    return this.orderService.create(body);
  }
}
