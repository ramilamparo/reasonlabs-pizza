import { Injectable } from '@nestjs/common';
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

  constructor() {
    this.stations.forEach((station, i, stations) => {
      const nextStation = stations[i + 1];
      if (nextStation) {
        station.completed.on('enqueue', (pizza) => {
          station.completed.remove(pizza);
          nextStation.pending.enqueue(pizza);
        });
      }
    });
    this.initializeListeners();
  }

  public async processNewOrder(order: Order) {
    await order.reload({ include: [{ model: Pizza, include: [Topping] }] });
    this.server.emit('order:update', order.toJSON());
    this.doughChefStation.pending.enqueue(order);
  }

  private initializeListeners() {
    this.doughChefStation.completed.on('enqueue', this.handleDoughComplete);
    this.toppingChefStation.completed.on('enqueue', this.handleToppingComplete);
    this.ovenStation.completed.on('enqueue', this.handleOvenComplete);
    this.waiterStation.completed.on('enqueue', this.handleWaiterComplete);
  }

  private handleDoughComplete = async (order: Order) => {
    await order.update({
      status: OrderStatus.DOUGH,
    });
    this.server.emit('order:update', order.toJSON());
  };

  private handleToppingComplete = async (order: Order) => {
    await order.update({
      status: OrderStatus.TOPPING,
    });
    this.server.emit('order:update', order.toJSON());
  };

  private handleOvenComplete = async (order: Order) => {
    await order.update({
      status: OrderStatus.OVEN,
    });
    this.server.emit('order:update', order.toJSON());
  };

  private handleWaiterComplete = async (order: Order) => {
    await order.update({
      status: OrderStatus.DONE,
    });
    this.server.emit('order:update', order.toJSON());
  };
}
