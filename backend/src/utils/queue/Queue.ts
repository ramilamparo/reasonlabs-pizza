import { EventHandler } from '../EventHandler';

export type QueueEvents = 'enqueue' | 'dequeue' | 'remove';

export abstract class Queue<T> extends EventHandler<QueueEvents, T> {
  public abstract enqueue(data: T): void;

  public abstract dequeue(): T | undefined;

  public abstract remove(data: T): T | undefined;

  public abstract isEmpty(): boolean;
}
