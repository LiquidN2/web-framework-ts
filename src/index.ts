// import { UserEdit } from './views/UserEdit';
// import { User } from './models/User';
//
// const root = document.getElementById('root');
//
// // const user = User.build({ name: 'Sarah', age: 19 });
// const user = User.build({ id: 1 });
// user.fetch();
//
// if (root) {
//   const userEdit = new UserEdit(root, user);
//   userEdit.render();
//   console.log(userEdit.regions);
// } else {
//   throw new Error('Root element not found');
// }

import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';

const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps): User => User.build(json)
);

users.on('change', () => {
  const usersList = new UserList(document.getElementById('root')!, users);
  usersList.render();
});

users.fetch();
