import { Station } from './Station';
import { IntervalQueueWorker } from '../queue/worker/IntervalQueueWorker';
import { WAITER_INTERVAL } from 'src/config/env';
import { Order } from 'src/modules/order/order.entity';

export class WaiterStation extends Station {
  constructor() {
    const workers = [
      new IntervalQueueWorker<Order>(WAITER_INTERVAL),
      new IntervalQueueWorker<Order>(WAITER_INTERVAL),
    ];
    super(workers);
  }
}
