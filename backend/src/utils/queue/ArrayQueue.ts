import { EventHandler } from '../EventHandler';
import { Queue } from './Queue';

export class MemoryQueue<T> extends Queue<T> {
  public queue: T[] = [];

  public enqueue(data: T) {
    this.queue.push(data);
    this.triggerEvent('enqueue', data);
  }

  public dequeue(): T | undefined {
    const data = this.queue.shift();
    if (data) {
      this.triggerEvent('dequeue', data);
    }
    return data;
  }

  public remove(data: T): T | undefined {
    const index = this.queue.indexOf(data);
    if (index >= 0) {
      this.queue.splice(index, 1);
      this.triggerEvent('remove', data);
      return data;
    }
  }

  public isEmpty() {
    return this.queue.length === 0;
  }
}
