import { Station } from './Station';
import { IntervalQueueWorker } from '../queue/worker/IntervalQueueWorker';
import { OVEN_INTERVAL } from 'src/config/env';
import { Order } from 'src/modules/order/order.entity';

export class OvenStation extends Station {
  constructor() {
    const workers = [new IntervalQueueWorker<Order>(OVEN_INTERVAL)];
    super(workers);
  }
}
