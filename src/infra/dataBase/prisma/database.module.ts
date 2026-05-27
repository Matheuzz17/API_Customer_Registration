import { Module } from "@nestjs/common";
import { PrismaService } from "./repositories/prisma.service";
import { UserRepository } from "../../../modules/repositories/UserRepository";
import { PrismaUserRepository } from "./repositories/prismaUserRepository";
@Module({
    providers: [PrismaService,
        {
        provide: UserRepository,
        useClass: PrismaUserRepository,
        },
    ],
    exports: [UserRepository],
    })

export class DatabaseModule{}