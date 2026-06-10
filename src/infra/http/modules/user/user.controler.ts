import { Body, Controller, Post, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiTags,
  ApiCreatedResponse, ApiOkResponse,
  ApiParam, ApiBadRequestResponse,
  ApiNotFoundResponse, ApiUnauthorizedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { CreateUserUseCase } from '../../../../modules/UseCases/UseCaseCreateUser';
import { FindAllUserUseCase } from '../../../../modules/UseCases/UseCaseFindAllUser';
import { FindUserByNameUseCase } from '../../../../modules/UseCases/UseCaseFindUserByName';
import { FindUserByEmailUseCase } from '../../../../modules/UseCases/UseCaseFindUserByEmail';
import { UpdateUserUseCase } from '../../../../modules/UseCases/UseCaseUpdateUser';
import { DeleteUserUseCase } from '../../../../modules/UseCases/UseCaseDeleteUser';
import { UseCreateUserBody } from './dtos/createUserBody';
import { UpdateUserBody } from './dtos/updateUserBody';
import { JwtAuthGuard } from '../auth/guards/jwtAuthGuard';

@ApiTags('Clientes')
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
  @ApiOperation({ summary: 'Cadastrar novo cliente' })
  @ApiCreatedResponse({ description: 'Cliente criado com sucesso' })
  @ApiConflictResponse({ description: 'Já existe um usuário cadastrado com esse e-mail' })
  @ApiBadRequestResponse({ description: 'Erro de validação dos campos enviados' })
  async createPost(@Body() body: UseCreateUserBody) {
    const { email, name, password, phone } = body;
    return await this.createUserUseCase.execute({ email, name, password, phone });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiOkResponse({ description: 'Lista de clientes retornada com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  async findAll() {
    return await this.findAllUsersUseCase.execute();
  }

  @Get('name/:name')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Buscar cliente por nome' })
  @ApiParam({ name: 'name', description: 'Nome do cliente' })
  @ApiOkResponse({ description: 'Cliente encontrado com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  async findByName(@Param('name') name: string) {
    return await this.findUserByNameUseCase.execute({ name });
  }

  @Get('email/:email')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Buscar cliente por e-mail' })
  @ApiParam({ name: 'email', description: 'E-mail do cliente' })
  @ApiOkResponse({ description: 'Cliente encontrado com sucesso' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  async findByEmail(@Param('email') email: string) {
    return await this.findUserByEmailUseCase.execute({ email });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Atualizar dados de um cliente' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiOkResponse({ description: 'Cliente atualizado com sucesso' })
  @ApiNotFoundResponse({ description: 'Usuário nao encontrado' })
  @ApiBadRequestResponse({ description: 'Erro de validação dos campos enviados' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  async update(@Param('id') id: string, @Body() body: UpdateUserBody) {
    const { name, email, phone } = body;
    return await this.updateUserUseCase.execute({ id, name, email, phone });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Remover um cliente' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiOkResponse({ description: 'Cliente removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  async delete(@Param('id') id: string) {
    return await this.deleteUserUseCase.execute({ id });
  }
}