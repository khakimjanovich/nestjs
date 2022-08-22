import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { Like, Repository } from "typeorm";
import { GetIndexRolesDto } from "./dto/get-index-roles.dto";

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>) {
  }

  findAll() {
    return this.rolesRepository.find();
  }

  async findOneById(id: number) {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException("Model with this id not found!");
    }

    return role;
  }

  async create({ name, label }: CreateRoleDto) {
    const role = await this.rolesRepository.findOne({ where: { name } });
    if (!role) {
      const new_role = await this.rolesRepository.create({ name, label });
      return this.rolesRepository.save(new_role);
    }

    throw new BadRequestException(`Model with this name: ${name} already exists!`);
  }

  async update(id: number, { label }: UpdateRoleDto) {
    const role = await this.findOneById(id);
    Object.assign(role, { label });

    return this.rolesRepository.save(role);
  }

  async paginate(query: GetIndexRolesDto) {
    const take: number = +query.take || 10;
    const skip: number = +query.skip || 0;
    const keyword: string = query.keyword || "";

    const [result, total] = await this.rolesRepository.findAndCount(
      {
        take,
        skip,
        where: { name: Like(`%${keyword}%`) }
      }
    );
    return {
      data: result,
      count: total
    };
  }
}
