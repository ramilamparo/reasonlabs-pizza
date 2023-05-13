import { QueueWorker } from './QueueWorker';

export class IntervalQueueWorker<T> extends QueueWorker<T> {
  private isProcessing = false;
  private interval: number;

  constructor(interval: number) {
    super();
    this.interval = interval;
  }

  public isIdle(): boolean {
    return !this.isProcessing;
  }

  protected start(data: T) {
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      this.triggerEvent('complete', data);
    }, this.interval);
  }
}
