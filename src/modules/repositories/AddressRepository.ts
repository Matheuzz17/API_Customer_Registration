import { Address } from '../entides/Address';

export abstract class AddressRepository {
  abstract create(address: Address): Promise<void>;
  abstract findByUserId(userId: string): Promise<Address[]>;
}