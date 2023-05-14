import { Topping } from 'src/modules/topping/topping.entity';
import { Queue } from '../Queue';
import { IntervalQueueWorker } from './IntervalQueueWorker';
import { QueueWorker } from './QueueWorker';
import { Order } from 'src/modules/order/order.entity';
import { MemoryQueue } from '../ArrayQueue';
import { ToppingStatus } from 'src/utils/ToppingStatus';

export class ToppingIntervalQueueWorker extends QueueWorker<Order> {
  private order: Order;
  private toppingsQueue = new MemoryQueue<Topping>();
  public readonly workers: QueueWorker<Topping>[] = [];

  constructor(interval: number) {
    super();
    this.workers = [
      new IntervalQueueWorker(interval),
      new IntervalQueueWorker(interval),
    ];
    this.workers.forEach((worker) => worker.watchQueue(this.toppingsQueue));
  }

  public isIdle(): boolean {
    return this.workers.every((worker) => worker.isIdle());
  }

  protected start(order: Order): void {
    this.order = order;
    order.pizza.toppings.forEach((topping) =>
      this.toppingsQueue.enqueue(topping),
    );
    this.workers.forEach((worker) => {
      worker.on('start', this.handleToppingStart);
      worker.on('complete', this.handleToppingComplete);
    });
  }

  private handleToppingStart = (topping: Topping) => {
    topping.update({
      status: ToppingStatus.IN_PROGRESS,
    });
  };

  private handleToppingComplete = (topping: Topping) => {
    topping
      .update({
        status: ToppingStatus.DONE,
      })
      .finally(() => {
        if (this.toppingsQueue.isEmpty()) {
          this.triggerEvent('complete', this.order);
        }
      });
  };
}
