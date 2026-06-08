import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CreateAddressUseCase } from '../../../../modules/UseCases/UseCaseCreateAddress';
import { CreateAddressBody } from './dtos/creaateAddressBody';
import { JwtAuthGuard} from '../auth/guards/jwtAuthGuard';

@Controller('clients/:clientId/addresses')  
export class AddressController {
  constructor(private createAddressUseCase: CreateAddressUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Param('clientId') userId: string, @Body() body: CreateAddressBody) {
    const { street, number, district, city, state, zipCode } = body;
    const address = await this.createAddressUseCase.execute({
      street,
      number,
      district,
      city,
      state,
      zipCode,
      userId,
    });
    return address;
  }
}