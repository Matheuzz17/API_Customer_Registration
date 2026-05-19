import { User } from "../entides/User";


export abstract class UerRepository {
    abstract create(user: User):Promise<void>
        
    }
