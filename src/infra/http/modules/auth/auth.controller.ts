import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthRequestModel } from './models/authRequestModel';
import { SingInUseCase } from '../../../../modules/auth/strategies/useCases/validateUserUseCase/singInUseCase/singInUseCase';
import { LocalAuthGuard } from './guards/localAuthGuard';

@Controller()
export class AuthController {
  constructor(private signInUseCase: SingInUseCase) {}

  @Post('singIn')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async singIn(@Request() request: AuthRequestModel) {
    const acess_token = await this.signInUseCase.execute({
      user: request.user,
    });
    return { acess_token };
  }
}