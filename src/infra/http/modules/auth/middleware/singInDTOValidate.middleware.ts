import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SingInBody } from '../dtos/SinginBody';
import { validate } from 'class-validator';

@Injectable()
export class SingInDTOValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body as SingInBody;
    const singInBody = new SingInBody();
    singInBody.email = body.email;
    singInBody.password = body.password;
    console.log(req.body);
    const validations = await validate(singInBody);

    if (validations.length) {
      throw new BadRequestException(validations);
    }

    next();
  }
}
