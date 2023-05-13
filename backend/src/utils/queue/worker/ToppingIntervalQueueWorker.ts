import { Topping } from 'src/modules/topping/topping.entity';
import { Queue } from '../Queue';
import { IntervalQueueWorker } from './IntervalQueueWorker';
import { QueueWorker } from './QueueWorker';
import { Order } from 'src/modules/order/order.entity';
import { MemoryQueue } from '../ArrayQueue';

export class ToppingIntervalQueueWorker extends QueueWorker<Order> {
  private toppingsQueue = new MemoryQueue<Topping>();
  private workers: QueueWorker<Topping>[] = [];

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

  protected start(data: Order): void {
    data.pizza.toppings.forEach((topping) =>
      this.toppingsQueue.enqueue(topping),
    );
    this.workers.forEach((worker) => {
      worker.on('complete', () => {
        if (this.toppingsQueue.isEmpty()) {
          this.triggerEvent('complete', data);
        }
      });
    });
  }
}
