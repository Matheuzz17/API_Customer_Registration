import { User } from '../../../modules/entides/User';
import { User as UserRaw } from '@prisma/client';
export class PrismaUserMappers {
  static toPrisma({ name, email, phone, password, id }: User): UserRaw {
    return {
      name,
      email,
      phone,
      password,
      id,
    };
  }
  static toDomain({ id, name, email, phone, password }: UserRaw): User {
    return new User(
      {
        name,
        email,
        phone,
        password,
      },
      id,
    );
  }
}
