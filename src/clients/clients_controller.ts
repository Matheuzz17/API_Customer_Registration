import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients_service';
import { JwtAuthGuard } from '../infra/http/modules/auth/guards/jwtAuthGuard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.clientsService.findAll(page, limit);
  }
}
