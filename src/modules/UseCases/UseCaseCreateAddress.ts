import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../repositories/AddressRepository';
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
  constructor(private addressRepository: AddressRepository) {}

  async execute(data: CreateAddressRequest): Promise<Address> {
    const address = new Address(data);

    await this.addressRepository.create(address);

    return address;
  }
}