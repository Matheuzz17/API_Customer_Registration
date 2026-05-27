import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/user.module';

@Module({
  imports: [UserModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
