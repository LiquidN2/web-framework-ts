// Parent Class
import { Model } from './Model';

import { Collection } from './Collection';

// Dependencies
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const ROOT_URL = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static build(attr: UserProps): User {
    return new User(
      new Attributes<UserProps>(attr),
      new ApiSync<UserProps>(ROOT_URL),
      new Eventing()
    );
  }

  // Swap out classes for different user type
  // static buildLocal(attr: UserProps): User {
  //   return new User(
  //     new Attributes<UserProps>(attr),
  //     new LocalSync<UserProps>(),  // save to local storage
  //     new Eventing()
  //   );
  // }

  // isAdminUser(): boolean {
  //   return this.get('id') === 1;
  // }

  static buildCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(ROOT_URL, (json: UserProps) =>
      User.build(json)
    );
  }

  setRandomAge = (): void => {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  };
}
