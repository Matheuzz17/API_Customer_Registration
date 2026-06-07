import { hash } from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';
import { Injectable } from '@nestjs/common';
import { User } from '../entides/User';
interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,

    name,

    password,

    phone,
  }: CreateUserRequest) {
    const user = new User({
      email,
      name,
      password: await hash(password, 10),
      phone,
    });

    await this.userRepository.create(user);

    return user;
  }
}
