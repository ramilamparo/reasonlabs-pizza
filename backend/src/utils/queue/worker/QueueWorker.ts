import { EventHandler } from 'src/utils/EventHandler';
import { Queue } from '../Queue';

export type QueueWorkerEvents = 'complete' | 'start';

export abstract class QueueWorker<T> extends EventHandler<
  QueueWorkerEvents,
  T
> {
  private queue: Queue<T>;

  constructor() {
    super();
    this.on('complete', this.handleOnComplete);
  }

  /**
   * Watches the queue so that when `enqueue()` is called,
   * the worker will start working on that item if worker is
   * not `isIdle()`
   */
  public watchQueue(queue: Queue<T>) {
    this.queue?.off('enqueue', this.handleOnEnqueue);
    this.queue = queue;
    this.queue.on('enqueue', this.handleOnEnqueue);
  }

  private handleOnEnqueue = (data: T) => {
    if (this.isIdle()) {
      const next = this.queue?.dequeue();
      if (next) {
        this.triggerEvent('start', next);
        this.start(next);
      }
    }
  };

  private handleOnComplete = () => {
    // Automatically gets the next item in the queue after competing the current item.
    const next = this.queue?.dequeue();
    if (next) {
      this.start(next);
    }
  };

  abstract isIdle(): boolean;

  protected abstract start(data: T): void;
}
