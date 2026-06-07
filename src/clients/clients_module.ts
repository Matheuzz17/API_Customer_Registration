import { Module } from '@nestjs/common';
import { ClientsController } from './clients_controller';
import { ClientsService } from './clients_service';
import { DatabaseModule } from '../infra/dataBase/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}