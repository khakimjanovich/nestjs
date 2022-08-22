import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { Permission } from "./entities/permission.entity";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GetIndexPermissionsDto } from "./dto/get-index-permissions.dto";

@Injectable()
export class PermissionsService {
  constructor(@InjectRepository(Permission) private permissionRepository: Repository<Permission>) {
  }

  findAll() {
    return this.permissionRepository.find();
  }

  async paginate(query: GetIndexPermissionsDto) {
    const page: number = +query.page || 1;
    const page_size: number = +query.page_size || 10;
    const search: string = query.search || "";

    const [data, count] = await this.permissionRepository.findAndCount(
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
      data,
      count,
      page_size
    };
  }

  async findOneById(id: number): Promise<{ data: Permission }> {
    const permission = await this.permissionRepository.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException("Model not found!");
    }

    return { data: permission };
  }

  async create({ name, label }: CreatePermissionDto) {
    const permission = await this.permissionRepository.findOne({ where: { name } });
    if (!permission) {
      const new_permission = await this.permissionRepository.create({ name, label });
      return this.permissionRepository.save(new_permission);
    }

    throw new BadRequestException(`Model with this name: ${name} already exists!`);
  }

  async update(id: number, { label }: UpdatePermissionDto): Promise<{ data: Permission }> {
    const { data: permission } = await this.findOneById(id);
    Object.assign(permission, { label });

    return { data: await this.permissionRepository.save(permission) };
  }
}
