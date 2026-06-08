import { Module } from "@nestjs/common";
import { UserCotroller } from "./user.controler";
import { CreateUserUseCase } from "../../../../modules/UseCases/UseCaseCreateUser";
import { FindAllUserUseCase } from "../../../../modules/UseCases/UseCaseFindAllUser";
import { FindUserByNameUseCase } from "../../../../modules/UseCases/UseCaseFindUserByName";
import { FindUserByEmailUseCase } from "../../../../modules/UseCases/UseCaseFindUserByEmail";
import { UpdateUserUseCase } from "../../../../modules/UseCases/UseCaseUpdateUser";
import { DeleteUserUseCase } from "../../../../modules/UseCases/UseCaseDeleteUser";
import { DatabaseModule } from "../../../dataBase/prisma/database.module";
import { ExchangeService } from "../../../../modules/exchange/exchange.service";
@Module({
  imports: [DatabaseModule],
  controllers: [UserCotroller],
  providers: [
    CreateUserUseCase,
    FindAllUserUseCase,
    FindUserByNameUseCase,
    FindUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ExchangeService,
  ],
})
export class UserModule {}