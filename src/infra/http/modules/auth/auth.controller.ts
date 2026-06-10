import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthRequestModel } from './models/authRequestModel';
import { SingInUseCase } from '../../../../modules/auth/strategies/useCases/validateUserUseCase/singInUseCase/singInUseCase';
import { LocalAuthGuard } from './guards/localAuthGuard';
import { SingInBody } from './dtos/SinginBody';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private signInUseCase: SingInUseCase) {}

  @Post('singIn')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Autenticar usuário e obter token JWT' })
  @ApiBody({ type: SingInBody })
  @ApiOkResponse({
    description: 'Token JWT gerado com sucesso',
    schema: { example: { acess_token: 'eyJhbGci...' } },
  })
  @ApiUnauthorizedResponse({ description: 'email ou senha incorretos' })
  async singIn(@Request() request: AuthRequestModel) {
    const acess_token = await this.signInUseCase.execute({ user: request.user });
    return { acess_token };
  }
}