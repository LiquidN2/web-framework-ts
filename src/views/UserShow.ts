import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
  get template(): string {
    return `
      <div>
        <h1>User Details</h1>
        <div>User's name</div>
        <div>User's age</div>
      </div>
    `;
  }
}
