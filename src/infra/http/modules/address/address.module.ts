import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { CreateAddressUseCase } from '../../../../modules/UseCases/UseCaseCreateAddress';
import { DatabaseModule } from '../../../dataBase/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [CreateAddressUseCase],
})
export class AddressModule {}