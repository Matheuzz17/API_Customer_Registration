import { Address } from '../entides/Address';
import { AddressRepository } from './AddressRepository';

export class AddressRepositoryInMemory implements AddressRepository {
  private addresses: Address[] = [];

  async create(address: Address): Promise<void> {
    this.addresses.push(address);
  }

  async findByUserId(userId: string): Promise<Address[]> {
    return this.addresses.filter(address => address.userId === userId);
  }
}