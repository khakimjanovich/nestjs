import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { Permission } from "./entities/permission.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PermissionsService {
  constructor(@InjectRepository(Permission) private permissionRepository: Repository<Permission>) {
  }

  findAll() {
    return this.permissionRepository.find();
  }

  async findOneById(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException("Model with this id not found!");
    }

    return permission;
  }

  async create({ name, label }: CreatePermissionDto) {
    const permission = await this.permissionRepository.findOne({ where: { name } });
    if (!permission) {
      const new_permission = await this.permissionRepository.create({ name, label });
      return this.permissionRepository.save(new_permission);
    }

    throw new BadRequestException(`Model with this name: ${name} already exists!`);
  }

  async update(id: number, { label }: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOneById(id);
    Object.assign(permission, { label });

    return this.permissionRepository.save(permission);
  }
}
