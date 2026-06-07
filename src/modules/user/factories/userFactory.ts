import { User } from '../../entides/User';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'email@gmail.com',
      name: 'Pedro, Matheus, Ruan',
      password: '123123',
      phone: '81999999999',
      ...override,
    },
    id,
  );
};
