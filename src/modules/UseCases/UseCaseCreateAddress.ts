import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from '../repositories/AddressRepository';
import { UserRepository } from '../repositories/UserRepository';
import { Address } from '../entides/Address';

interface CreateAddressRequest {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  userId: string;
}

@Injectable()
export class CreateAddressUseCase {
  constructor(
    private addressRepository: AddressRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(data: CreateAddressRequest): Promise<Address> {
    const userExists = await this.userRepository.findById(data.userId);

    if (!userExists) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const address = new Address(data);
    await this.addressRepository.create(address);

    return address;
  }
}