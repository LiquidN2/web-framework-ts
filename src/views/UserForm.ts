import { User, UserProps } from '../models/User';
import { View, EventHandler, EventsMap } from './View';

export class UserForm extends View<User, UserProps> {
  eventsMap = (): EventsMap => {
    return {
      'click:.set-age': this.onSetAgeClick,
      'submit:.form': this.onFormSubmit,
      'click:.save-user': this.onSaveClick,
    };
  };

  // DOM event handlers
  onSetAgeClick: EventHandler = () => {
    console.log('Set age');
    this.model.setRandomAge();
  };

  onFormSubmit: EventHandler = event => {
    event.preventDefault();

    const inputName = this.parent.querySelector<HTMLInputElement>('input');
    if (!inputName) return;
    const inputValue = inputName.value.trim();
    if (!inputValue) return;

    this.model.set({ name: inputValue });
  };

  onSaveClick = () => this.model.save();

  // Template
  get template(): string {
    const name = this.model.get('name') || '';

    return `
      <div>
        <form class="form">
          <input type="text" name="name" placeholder='${name}' />
          <button type="submit" class="set-name">Update Name</button>
          <button type="button" class="set-age">Set Random Age</button>
          <button type="button" class="save-user">Save user</button>
        </form>
      </div>
    `;
  }
}
