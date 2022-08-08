import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOneById(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException("Model with this id not found!");
    }

    return role;
  }

  async create({ name, label }: CreateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { name } });
    if (!role) {
      const new_role = await this.roleRepository.create({ name, label });
      return this.roleRepository.save(new_role);
    }

    throw new BadRequestException(`Model with this name: ${name} already exists!`);
  }

  async update(id: number, { label }: UpdateRoleDto) {
    const role = await this.findOneById(id);
    Object.assign(role, { label });

    return this.roleRepository.save(role);
  }
}
