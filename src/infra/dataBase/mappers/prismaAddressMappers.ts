import { Address } from '../../../modules/entides/Address';
import { Address as AddressRaw } from '@prisma/client';

export class PrismaAddressMappers {
  static toPrisma({ id, street, number, district, city, state, zipCode, userId }: Address): AddressRaw {
    return {
      id,
      street,
      number,
      district,
      city,
      state,
      zipCode,
      userId,
    };
  }

  static toDomain({ id, street, number, district, city, state, zipCode, userId }: AddressRaw): Address {
    return new Address(
      {
        street,
        number,
        district,
        city,
        state,
        zipCode,
        userId,
      },
      id,
    );
  }
}