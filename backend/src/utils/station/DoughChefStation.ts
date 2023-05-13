import { Order } from 'src/modules/order/order.entity';
import { IntervalQueueWorker } from '../queue/worker/IntervalQueueWorker';
import { Station } from './Station';
import { DOUGH_CHEF_INTERVAL } from 'src/config/env';

export class DoughChefStation extends Station {
  constructor() {
    const workers = [
      new IntervalQueueWorker<Order>(DOUGH_CHEF_INTERVAL),
      new IntervalQueueWorker<Order>(DOUGH_CHEF_INTERVAL),
    ];
    super(workers);
  }
}
