import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../repositories/UserRepositoryInMemory';
import { CreateUserUseCase } from './UseCaseCreateUser';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create user', async () => {
  const user = await createUserUseCase.execute({
    email: 'email@email.com',
    name: 'gabriel',
    password: '231254',
    phone: '982235698',
  });
  const foundUser = await userRepositoryInMemory.findByEmail('email@email.com');
  expect(foundUser).toEqual(user);
});

  it('Should be able to create user with password encrypted', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'gabriel',
      password: userPasswordWithoutEncryption,
      phone: '982235698',
    });

    const userHasPasswordEncrypted = await compare(
      userPasswordWithoutEncryption,
      user.password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy();
  });
});