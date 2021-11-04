export type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  // registers the callback under an event name
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  // triggers the callbacks registered with the event
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) return;
    handlers.forEach((handler: Callback) => handler());
  };
}
