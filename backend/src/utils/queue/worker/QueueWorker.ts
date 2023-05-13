import { EventHandler } from 'src/utils/EventHandler';
import { Queue } from '../Queue';

export type QueueWorkerEvents = 'complete';

export abstract class QueueWorker<T> extends EventHandler<
  QueueWorkerEvents,
  T
> {
  private queue: Queue<T>;

  constructor() {
    super();
    // Automatically gets the next item in the queue after competing the current item.
    this.on('complete', () => {
      const next = this.queue?.dequeue();
      if (next) {
        this.start(next);
      }
    });
  }

  /**
   * Watches the queue so that when `enqueue()` is called,
   * the worker will start working on that item if worker is
   * not `isIdle()`
   */
  public watchQueue(queue: Queue<T>) {
    this.queue = queue;
    queue.on('enqueue', (data: T) => {
      if (this.isIdle()) {
        const next = this.queue?.remove(data);
        if (next) {
          this.start(next);
        }
      }
    });
  }

  abstract isIdle(): boolean;

  protected abstract start(data: T): void;
}
