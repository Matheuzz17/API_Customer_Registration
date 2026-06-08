import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/UserRepository";
import { AddressRepository } from "../repositories/AddressRepository";
import { ExchangeService } from "../exchange/exchange.service";

@Injectable()
export class FindAllUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private addressRepository: AddressRepository,
    private exchangeService: ExchangeService,
  ) {}

  async execute() {
    const users = await this.userRepository.findAll();
    const exchange = await this.exchangeService.getExchangeRate();

    const usersWithAddresses = await Promise.all(
      users.map(async (user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        addresses: await this.addressRepository.findByUserId(user.id),
      }))
    );

    return { users: usersWithAddresses, exchange };
  }
}