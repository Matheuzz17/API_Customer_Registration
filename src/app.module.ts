import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './infra/http/modules/user/user.module';
import { DatabaseModule } from './infra/dataBase/prisma/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { AddressModule } from './infra/http/modules/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}