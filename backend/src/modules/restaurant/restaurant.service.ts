import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/modules/order/order.entity';
import { OrderStatus } from 'src/utils/OrderStatus';
import { DoughChefStation } from 'src/utils/station/DoughChefStation';
import { OvenStation } from 'src/utils/station/OvenStation';
import { Station } from 'src/utils/station/Station';
import { ToppingChefStation } from 'src/utils/station/ToppingChefStation';
import { WaiterStation } from 'src/utils/station/WaiterStation';
import { Topping } from '../topping/topping.entity';
import { Pizza } from '../pizza/pizza.entity';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Log } from '../logs/log.entity';
import { RepositoryName } from 'src/utils/constants';

@WebSocketGateway({
  cors: true,
})
@Injectable()
export class RestaurantService {
  @WebSocketServer() private readonly server: Server;
  public readonly doughChefStation = new DoughChefStation();
  public readonly toppingChefStation = new ToppingChefStation();
  public readonly ovenStation = new OvenStation();
  public readonly waiterStation = new WaiterStation();
  private stations: Station[] = [
    this.doughChefStation,
    this.toppingChefStation,
    this.ovenStation,
    this.waiterStation,
  ];

  constructor(
    @Inject(RepositoryName.LOG)
    private logRepository: typeof Log,
  ) {
    this.stations.forEach((station, i, stations) => {
      const nextStation = stations[i + 1];
      if (nextStation) {
        station.completed.on('enqueue', () => {
          const next = station.completed.dequeue();
          if (next) {
            nextStation.pending.enqueue(next);
          }
        });
      }
    });
    this.initializeListeners();
  }

  public async processNewOrder(order: Order) {
    await order.reload({ include: [{ model: Pizza, include: [Topping] }] });
    this.logOrderStatusAndEmit(order, OrderStatus.PENDING);
    this.doughChefStation.pending.enqueue(order);
  }

  private initializeListeners() {
    this.doughChefStation.pending.on('dequeue', this.handleDoughStart);
    this.toppingChefStation.pending.on('dequeue', this.handleToppingStart);
    this.ovenStation.pending.on('dequeue', this.handleOvenStart);
    this.waiterStation.pending.on('dequeue', this.handleWaiterStart);

    this.doughChefStation.completed.on('enqueue', this.handleDoughComplete);
    this.toppingChefStation.completed.on('enqueue', this.handleToppingComplete);
    this.ovenStation.completed.on('enqueue', this.handleOvenComplete);
    this.waiterStation.completed.on('enqueue', this.handleWaiterComplete);
  }

  private logOrderStatusAndEmit = async (order: Order, status: OrderStatus) => {
    const log = await this.logRepository.create({
      moduleId: order.id,
      module: 'ORDERS',
      state: status,
    });
    await order.$add('logs', log);
    await order.reload({
      include: [
        { model: Pizza, include: [Topping] },
        { model: Log, where: { module: 'ORDERS' } },
      ],
    });
    this.server.emit('order:update', order.toJSON());
  };

  private handleDoughStart = (order: Order) => {
    this.logOrderStatusAndEmit(order, OrderStatus.DOUGH_START);
  };

  private handleToppingStart = (order: Order) => {
    this.logOrderStatusAndEmit(order, OrderStatus.TOPPING_START);
  };

  private handleOvenStart = (order: Order) => {
    this.logOrderStatusAndEmit(order, OrderStatus.OVEN_START);
  };

  private handleWaiterStart = (order: Order) => {
    this.logOrderStatusAndEmit(order, OrderStatus.WAITER_START);
  };

  private handleDoughComplete = (order: Order) => {
    this.logOrderStatusAndEmit(order, OrderStatus.DOUGH_END);
  };

  private handleToppingComplete = (order: Order) => {
    this.logOrderStatusAndEmit(order, OrderStatus.TOPPING_END);
  };

  private handleOvenComplete = (order: Order) => {
    this.logOrderStatusAndEmit(order, OrderStatus.OVEN_END);
  };

  private handleWaiterComplete = (order: Order) => {
    this.logOrderStatusAndEmit(order, OrderStatus.WAITER_END);
  };
}
