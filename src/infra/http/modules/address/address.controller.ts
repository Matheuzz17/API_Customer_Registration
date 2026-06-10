import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiTags,
  ApiCreatedResponse, ApiParam,
  ApiBadRequestResponse, ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateAddressUseCase } from '../../../../modules/UseCases/UseCaseCreateAddress';
import { CreateAddressBody } from './dtos/creaateAddressBody';
import { JwtAuthGuard } from '../auth/guards/jwtAuthGuard';

@ApiTags('Endereços')
@Controller('clients/:clientId/addresses')
export class AddressController {
  constructor(private createAddressUseCase: CreateAddressUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Cadastrar endereço para um cliente' })
  @ApiParam({ name: 'clientId', description: 'ID do cliente' })
  @ApiCreatedResponse({ description: 'Endereço criado com sucesso' })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado' })
  @ApiBadRequestResponse({ description: 'CEP inválido' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  async create(@Param('clientId') userId: string, @Body() body: CreateAddressBody) {
    const { street, number, district, city, state, zipCode } = body;
    return await this.createAddressUseCase.execute({ street, number, district, city, state, zipCode, userId });
  }
}