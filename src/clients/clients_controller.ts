import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiQuery,
  ApiTags, ApiOkResponse, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ClientsService } from './clients_service';
import { JwtAuthGuard } from '../infra/http/modules/auth/guards/jwtAuthGuard';

@ApiTags('Listagem')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Listar clientes com paginação' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Itens por página' })
  @ApiOkResponse({ description: 'Lista paginada de clientes retornada com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.clientsService.findAll(page, limit);
  }
}