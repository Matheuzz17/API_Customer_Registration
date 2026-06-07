import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/UserRepository";
import { ExchangeService } from "../exchange/exchange.service";

@Injectable()
export class FindAllUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private exchangeService: ExchangeService,
  ) {}

  async execute() {
    const users = await this.userRepository.findAll();
    const exchange = await this.exchangeService.getExchangeRate();

    return { users, exchange };
  }
}