import { Injectable } from '@nestjs/common';
import { User } from '../../../../modules/entides/User';
import { UserRepository } from '../../../../modules/repositories/UserRepository';
import { PrismaUserMappers } from '../../mappers/prismaUserMappers';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMappers.toPrisma(user);
    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return PrismaUserMappers.toDomain(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => PrismaUserMappers.toDomain(user));
  }

  async findByName(name: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return users.map(user => PrismaUserMappers.toDomain(user));
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return PrismaUserMappers.toDomain(user);
  }

  async update(user: User): Promise<void> {
    const userRaw = PrismaUserMappers.toPrisma(user);
    await this.prisma.user.update({
      where: { id: userRaw.id },
      data: userRaw,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}