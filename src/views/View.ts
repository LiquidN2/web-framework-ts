import { Model } from '../models/Model';

export type EventHandler = (event: Event) => void;

export interface EventsMap {
  [key: string]: EventHandler;
}

interface Regions {
  [key: string]: Element;
}

export interface RegionsMap {
  [key: string]: string;
}

export abstract class View<T extends Model<K>, K> {
  regions: Regions = {};

  public constructor(protected parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template: string;

  // Add handler to model "chang" event
  private bindModel(): void {
    this.model.on('change', () => this.render());
  }

  eventsMap = (): EventsMap => ({});

  // Bind DOM events to handlers
  private bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    // Check if eventsMap is empty
    if (Object.entries(eventsMap).length === 0) return;

    for (let key in eventsMap) {
      const [eventName, selector] = key.split(':');

      fragment.querySelectorAll(selector).forEach((element: Node): void => {
        element.addEventListener(eventName, eventsMap[key]);
      });
    }
  }

  regionsMap = (): RegionsMap => ({});

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];

      const element = fragment.querySelector(selector);
      if (!element) return;

      this.regions[key] = element;
    }
  }

  onRender(): void {}

  render(): void {
    // Clear content
    this.parent.innerHTML = '';

    // Convert string to HTML
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template;

    // Add event listeners
    this.bindEvents(templateElement.content);

    this.mapRegions(templateElement.content);

    this.onRender();

    // Insert HTML to the DOM
    this.parent.append(templateElement.content);
  }
}
