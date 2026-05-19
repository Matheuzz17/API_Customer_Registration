import { hash } from "crypto";
import { UerRepository } from "../repositories/UserRepository";
import { Injectable } from "@nestjs/common";
import { User } from "../entides/User";
interface CreateUserRequest{
    email: string;
    name: string;
    password: string;
    phone: string;
}

@Injectable()
export class CreateUserUseCase{
    constructor(private userRepository: UerRepository ){}

    async execute({email, name, password, phone}){
        const user = new User({
            email,
            name,
            password: await hash(password,10),
            phone,
        });
        this.userRepository.create(user)
    }
}