import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../modules/UseCases/UseCaseCreateUser';
import { FindAllUserUseCase } from '../../../../modules/UseCases/UseCaseFindAllUser';
import { FindUserByNameUseCase } from '../../../../modules/UseCases/UseCaseFindUserByName';
import { FindUserByEmailUseCase } from '../../../../modules/UseCases/UseCaseFindUserByEmail';
import { UpdateUserUseCase } from '../../../../modules/UseCases/UseCaseUpdateUser';
import { DeleteUserUseCase } from '../../../../modules/UseCases/UseCaseDeleteUser';
import { UseCreateUserBody } from './dtos/createUserBody';
import { UpdateUserBody } from './dtos/updateUserBody';

@Controller('Clientes')
export class UserCotroller {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findAllUsersUseCase: FindAllUserUseCase,
    private findUserByNameUseCase: FindUserByNameUseCase,
    private findUserByEmailUseCase: FindUserByEmailUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async createPost(@Body() body: UseCreateUserBody) {
    const { email, name, password, phone } = body;
    const user = await this.createUserUseCase.execute({
      email,
      name,
      password,
      phone,
    });
    return user;
  }


   @Get()
  async findAll() {
    return await this.findAllUsersUseCase.execute();
  }


  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    return await this.findUserByNameUseCase.execute({ name });
  }



  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return await this.findUserByEmailUseCase.execute({ email });
  }



  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserBody) {
    const { name, email, phone } = body;
    return await this.updateUserUseCase.execute({
    id,
    name,
    email, 
    phone });
  }



@Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteUserUseCase.execute({ id });
  }
}
