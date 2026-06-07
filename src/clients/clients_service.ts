import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/dataBase/prisma/repositories/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({ skip, take }),
      this.prisma.user.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }
}