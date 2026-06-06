import { Inject, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/UserRepository";

interface DeleteUserRequest{
    id: string;
}
@Injectable()
export class DeleteUserUseCase{
    constructor(private userRepository: UserRepository){}
    async execute({id}:DeleteUserRequest){
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundException('Usuário não encontrado');
        await this.userRepository.delete(id);

    }
}