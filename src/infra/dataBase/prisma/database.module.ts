import { Module } from "@nestjs/common";
import { PrismaService } from "./repositories/prisma.service";
import { UserRepository } from "../../../modules/repositories/UserRepository";
import { PrismaUserRepository } from "./repositories/prismaUserRepository";
import { AddressRepository } from "../../../modules/repositories/AddressRepository";
import { PrismaAddressRepository } from "./repositories/prismaAddressRepository";

@Module({
    providers: [
        PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository,
        },
        {
            provide: AddressRepository,
            useClass: PrismaAddressRepository,
        },
    ],
    exports: [PrismaService, UserRepository, AddressRepository],
})
export class DatabaseModule{}