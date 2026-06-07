import { Controller, Get, Query } from '@nestjs/common';
import { ClientsService } from './clients_service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.clientsService.findAll(page, limit);
  }
}