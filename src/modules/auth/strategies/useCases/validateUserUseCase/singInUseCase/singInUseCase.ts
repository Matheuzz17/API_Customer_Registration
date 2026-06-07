import { Injectable } from '@nestjs/common';
import { User } from '../../../../../entides/User';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../../../../../../infra/http/modules/auth/models/UserPayload';

interface SingInRequest {
  user: User;
}

@Injectable()
export class SingInUseCase {
  constructor(private jwtService: JwtService) {}
  async execute({ user }: SingInRequest) {
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
    };

    const jwtToken = this.jwtService.sign(payload);

    return jwtToken;
  }
}
