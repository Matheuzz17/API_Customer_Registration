import { Module } from '@nestjs/common';
import { LocalStrategy } from '../../../../modules/auth/strategies/local.strategy';
import { AuthController } from './auth.controller';
import { ValidateUserUseCase } from '../../../../modules/auth/strategies/useCases/validateUserUseCase/validateUserUseCase';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../../../dataBase/prisma/database.module';
import { SingInDTOValidateMiddleware } from './middleware/singInDTOValidate.middleware';
import { MiddlewareConsumer } from '@nestjs/common';
import { SingInUseCase } from '../../../../modules/auth/strategies/useCases/validateUserUseCase/singInUseCase/singInUseCase';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../../../modules/auth/strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    DatabaseModule,
    UserModule,
JwtModule.registerAsync({
  useFactory: () => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  }),
}),
  ],

  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SingInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SingInDTOValidateMiddleware).forRoutes('/singIn');
  }
}
