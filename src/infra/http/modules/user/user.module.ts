import { Module } from "@nestjs/common";
import { UserCotroller } from "./user.controler";
import { CreateUserUseCase } from "../../../../modules/UseCases/UseCaseCreateUser";
import { DatabaseModule } from "../../../dataBase/prisma/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [UserCotroller],
  providers: [CreateUserUseCase],
})
export class UserModule {}