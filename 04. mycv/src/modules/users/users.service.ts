import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    create(email: string, password: string) {
        const user = this.userRepository.create({email, password})

        return this.userRepository.save(user);
    }

    async findOneById(id: number) {
        if (!id) {
            return null
        }

        const user = await this.userRepository.findOne({where: {id}});
        if (!user) {
            throw new NotFoundException('User not found!');
        }
        return user;
    }

    findAllByEmail(email: string) {
        return this.userRepository.find({where: {email}})
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOneById(id);
        if (!user) {
            throw new NotFoundException('User not found!')
        }
        Object.assign(user, attrs);
        return this.userRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOneById(id)
        if (!user) {
            throw new NotFoundException('User not found!')
        }

        return this.userRepository.remove(user);
    }
}
