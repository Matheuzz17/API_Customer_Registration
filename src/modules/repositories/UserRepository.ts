import { User } from "../entides/User";


export abstract class UserRepository {
    abstract create(user: User):Promise<void>
        
    }
