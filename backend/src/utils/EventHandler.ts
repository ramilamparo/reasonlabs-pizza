export type EventHandlerCallback<T> = (data: T) => void;

export abstract class EventHandler<K extends string, T> {
  protected events: Partial<Record<K, EventHandlerCallback<T>[]>> = {};

  public on(event: K, callback: EventHandlerCallback<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    const callbacks = this.events[event];
    if (!callbacks?.includes(callback)) {
      callbacks?.push(callback);
    }
  }

  public off(event: K, callback?: EventHandlerCallback<T>) {
    const callbacks = this.events[event];
    if (callbacks && callback) {
      const index = callbacks.indexOf(callback);
      if (index >= 0) {
        callbacks.splice(index, 1);
      }
    }
    if (event && !callback) {
      delete this.events[event];
    }
  }

  protected triggerEvent(event: K, data: T) {
    this.events[event]?.forEach((callback) => callback(data));
  }
}
