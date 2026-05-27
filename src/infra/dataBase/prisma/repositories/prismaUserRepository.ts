import { Injectable } from "@nestjs/common";
import { User } from "../../../../modules/entides/User";
import { UserRepository } from "../../../../modules/repositories/UserRepository";
import { PrismaUserMappers } from "../../mappers/prismaUserMappers";
import { PrismaService } from "./prisma.service";
@Injectable()
export class PrismaUserRepository implements UserRepository{
    constructor(private prisma: PrismaService){}
   async create(user: User): Promise<void> {
        const userRaw = PrismaUserMappers.toPrisma(user);
        await this.prisma.user.create({
            data: userRaw
        })
    }
}