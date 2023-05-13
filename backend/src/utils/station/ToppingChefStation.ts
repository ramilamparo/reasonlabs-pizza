import { Station } from './Station';
import { ToppingIntervalQueueWorker } from '../queue/worker/ToppingIntervalQueueWorker';
import { TOPPING_CHEF_INTERVAL } from 'src/config/env';

export class ToppingChefStation extends Station {
  constructor() {
    const workers = [
      new ToppingIntervalQueueWorker(TOPPING_CHEF_INTERVAL),
      new ToppingIntervalQueueWorker(TOPPING_CHEF_INTERVAL),
      new ToppingIntervalQueueWorker(TOPPING_CHEF_INTERVAL),
    ];
    super(workers);
  }
}
