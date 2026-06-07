import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../../repositories/UserRepository';
import { compare } from 'bcrypt';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException('email ou senha incorretos');
    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched)
      throw new UnauthorizedException('email ou senha incorretos');

    return user;
  }
}
