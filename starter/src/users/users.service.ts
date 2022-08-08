import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }

  findAll() {
    return this.usersRepository.find();
  }

  async create({ name, email, password }: CreateUserDto) {
    const user: User = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      const new_user = await this.usersRepository.create({ name, email, password });
      return this.usersRepository.save(new_user);
    }

    throw new BadRequestException("Model with this email has already been registered!");
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("Model not found!");
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }
}
