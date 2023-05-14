import { Queue } from '../queue/Queue';
import { QueueWorker } from '../queue/worker/QueueWorker';
import { Order } from 'src/modules/order/order.entity';
import { MemoryQueue } from '../queue/ArrayQueue';

export abstract class Station {
  constructor(
    public readonly workers: QueueWorker<Order>[],
    public pending: Queue<Order> = new MemoryQueue(),
    public completed: Queue<Order> = new MemoryQueue(),
  ) {
    this.workers.forEach((worker) => {
      worker.watchQueue(this.pending);
      worker.on('complete', (pizza) => {
        this.completed.enqueue(pizza);
      });
    });
  }
}
