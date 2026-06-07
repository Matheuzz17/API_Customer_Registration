import { UserPayload } from '../../../../../../infra/http/modules/auth/models/UserPayload';
import { makeUser } from '../../../../../user/factories/userFactory';
import { SingInUseCase } from './singInUseCase';
import { JwtService } from '@nestjs/jwt';

let singInUseCase: SingInUseCase;
let jwtService: JwtService;

describe('sign in', () => {
  beforeEach(() => {
    jwtService = new JwtService({
      secret: 'secret',
    });

    singInUseCase = new SingInUseCase(jwtService);
  });
  it('should be able to create valid access_token', async () => {
    const user = makeUser({});
    const token = await singInUseCase.execute({
      user,
    });
    const payload: UserPayload = jwtService.decode(token);
    expect(payload.id).toEqual(user.id);
  });
});
