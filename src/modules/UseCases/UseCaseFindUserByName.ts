import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/UserRepository";

interface FindUserByNameRequest{
    name: string;
}
@Injectable()
export class FindUserByNameUseCase{
    constructor (private userRepository:UserRepository){}

    async execute ({name}: FindUserByNameRequest){
        return await this.userRepository.findByName(name);
    }
}