import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/UserRepository";

interface FindUserByNameRequest {
  name: string;
}

@Injectable()
export class FindUserByNameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name }: FindUserByNameRequest) {
    const users = await this.userRepository.findByName(name);

    if (!users || users.length === 0) {
      throw new NotFoundException('Nenhum usuário encontrado com esse nome');
    }

    return users;
  }
}