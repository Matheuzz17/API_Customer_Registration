import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../../../modules/UseCases/UseCaseCreateUser";
import { UseCreateUserBody } from "./dtos/createUserBody";

@Controller('users')
export class UserCotroller{
constructor(private createUserUseCase: CreateUserUseCase){}

@Post()
async createPost(@Body() body:UseCreateUserBody ){
    const {email, name, password, phone} = body
   const user = await this.createUserUseCase.execute({email, name , password, phone});
   return user
}
}