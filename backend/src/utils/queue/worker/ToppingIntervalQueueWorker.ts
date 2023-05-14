import { Topping } from 'src/modules/topping/topping.entity';
import { Queue } from '../Queue';
import { IntervalQueueWorker } from './IntervalQueueWorker';
import { QueueWorker } from './QueueWorker';
import { Order } from 'src/modules/order/order.entity';
import { MemoryQueue } from '../ArrayQueue';

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
    this.workers.forEach((worker) => {
      worker.watchQueue(this.toppingsQueue);
      worker.on('complete', this.handleToppingComplete);
    });
  }

  public isIdle(): boolean {
    return this.workers.every((worker) => worker.isIdle());
  }

  protected start(order: Order): void {
    this.order = order;
    order.pizza.toppings.forEach((topping) =>
      this.toppingsQueue.enqueue(topping),
    );
  }

  private handleToppingComplete = () => {
    if (this.toppingsQueue.isEmpty() && this.isIdle()) {
      this.triggerEvent('complete', this.order);
    }
  };
}
