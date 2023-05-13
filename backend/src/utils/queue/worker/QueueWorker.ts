import { EventHandler } from 'src/utils/EventHandler';
import { Queue } from '../Queue';

export type QueueWorkerEvents = 'complete';

export abstract class QueueWorker<T> extends EventHandler<
  QueueWorkerEvents,
  T
> {
  public watchQueue(queue: Queue<T>) {
    queue.on('enqueue', (data) => {
      if (this.isIdle()) {
        const next = queue.remove(data);
        if (next) {
          this.start(next);
        }
      }
    });
  }

  abstract isIdle(): boolean;

  protected abstract start(data: T): void;
}
