import type { Request } from 'express';
import { User } from '../../../../../modules/entides/User';

export class AuthRequestModel extends Request {
  user!: User;
}
