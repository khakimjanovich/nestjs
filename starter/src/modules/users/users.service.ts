import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Like, Repository } from "typeorm";
import { GetIndexUsersDto } from "./dto/get-index-users.dto";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }

  findAll() {
    return this.usersRepository.find();
  }

  async paginate(query: GetIndexUsersDto): Promise<{ data: User[]; count: number; page: number; page_size: number }> {
    const page: number = +query.page || 1;
    const page_size: number = +query.page_size || 10;
    const search: string = query.search || "";

    const [data, count] = await this.usersRepository.findAndCount(
      {
        order: {
          created_at: "DESC"
        },
        where: search ? { name: Like(`%${search}%`) } : {},
        skip: (page - 1) * page_size,
        take: page_size
      }
    );
    return {
      page,
      data: data.map(datum => {
        delete datum.password;
        return datum;
      }),
      count,
      page_size
    };
  }

  async create({ name, email, password }: CreateUserDto) {
    const updated_password = await this.hashPassword(password);
    const user: User = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      const new_user = await this.usersRepository.create({ name, email, password: updated_password });
      return this.usersRepository.save(new_user);
    }

    throw new BadRequestException("Model with this email has already been registered!");
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("Model not found!");
    }

    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);

    if (updateUserDto.email !== user.email) {
      const search_user = await this.findByEmail(updateUserDto.email);
      if (search_user) {
        throw new BadRequestException("Email in use!");
      }
    }
    Object.assign(user, updateUserDto);

    const updated_user = await this.usersRepository.save(user);
    delete updated_user.password;
    return updated_user;
  }

  async updatePassword(id: number, updatePasswordDto: UpdateUserPasswordDto): Promise<User> {
    const user = await this.findOneById(id);

    if (updatePasswordDto.password_confirmation !== updatePasswordDto.password) {
      throw new BadRequestException("Password must match!");
    }
    const updated_password = this.hashPassword(updatePasswordDto.password);

    Object.assign(user, { password: updated_password });

    const updated_user = await this.usersRepository.save(user);
    delete updated_user.password;
    return updated_user;
  }

  findByEmail(email: string): Promise<User[]> {
    return this.usersRepository.find({ where: { email } });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + "." + hash.toString("hex");
  }
}
