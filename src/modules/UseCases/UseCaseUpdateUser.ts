import { Injectable, NotAcceptableException } from "@nestjs/common";
import { UserRepository } from "../repositories/UserRepository";
interface UpdateUserRequest{
    id: string;
    name?: string;
    email?: string;
    phone?: string;
}
@Injectable()
export class UpdateUserUseCase{
    constructor(private userRepository:UserRepository){}
    async execute({id, name, email,phone}:UpdateUserRequest){
    const user = await this.userRepository.findById(id);
    if (!user)
        throw new NotAcceptableException('Usuário nao encontrado');

    if(name)
        user.name = name;

    if(email)
        user.email = email;

    if(phone)
        user.phone = phone;

    await this.userRepository.update(user);
    return user;

    }
}