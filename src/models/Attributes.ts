export class Attributes<T> {
  constructor(private data: T) {}

  // always binds 'this' to the instance of Attributes
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set = (update: T): void => {
    Object.assign(this.data, update);
  };

  getAll(): T {
    return this.data;
  }
}
