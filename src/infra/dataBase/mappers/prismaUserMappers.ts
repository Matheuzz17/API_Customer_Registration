import { User } from "../../../modules/entides/User";

import { User as UserRaw  } from "@prisma/client";
export class PrismaUserMappers{
    static toPrisma({name, email, phone, password, id} : User):UserRaw{
return{
 name,
 email,
 phone,
 password,
 id,
}
    }
}