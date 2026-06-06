import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';

interface FindUserByEmailRequest {
  email: string;
}

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email }: FindUserByEmailRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }
 
  }
