import { Pizza } from 'src/modules/pizza/pizza.entity';
import { Queue } from '../queue/Queue';
import { QueueWorker } from '../queue/worker/QueueWorker';
import { Order } from 'src/modules/order/order.entity';

export abstract class Station {
  constructor(
    protected workers: QueueWorker<Order>[],
    public pending: Queue<Order> = new Queue(),
    public completed: Queue<Order> = new Queue(),
  ) {
    this.workers.forEach((worker) => {
      worker.watchQueue(this.pending);
      worker.on('complete', (pizza) => {
        this.completed.enqueue(pizza);
      });
    });
  }
}
