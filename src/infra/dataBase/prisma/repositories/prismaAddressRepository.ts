import { Injectable } from '@nestjs/common';
import { Address } from '../../../../modules/entides/Address';
import { AddressRepository } from '../../../../modules/repositories/AddressRepository';
import { PrismaAddressMappers } from '../../mappers/prismaAddressMappers';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(address: Address): Promise<void> {
    const addressRaw = PrismaAddressMappers.toPrisma(address);
    await this.prisma.address.create({
      data: addressRaw,
    });
  }

  async findByUserId(userId: string): Promise<Address[]> {
    const addresses = await this.prisma.address.findMany({
      where: { userId },
    });

    return addresses.map(PrismaAddressMappers.toDomain);
  }
}