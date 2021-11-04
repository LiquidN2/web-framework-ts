import type { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export class Model<T extends { id?: number }> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  // EVENTS METHODS
  // get on() {
  //   return this.events.on;
  // }
  on = this.events.on;

  // get trigger() {
  //   return this.events.trigger;
  // }
  trigger = this.events.trigger;

  // ATTRIBUTES METHODS
  // get get() {
  //   return this.attributes.get;
  // }
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  // SYNC METHODS
  fetch(): void {
    const id = this.get('id');
    if (!id || typeof id !== 'number')
      throw new Error('Cannot fetch without an id');

    this.sync
      .fetch(id)
      .then((response: AxiosResponse): void => this.set(response.data));
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => this.trigger('save'))
      .catch((): void => this.trigger('error'));
  }
}
