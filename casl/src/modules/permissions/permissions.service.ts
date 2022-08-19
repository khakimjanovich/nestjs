import {Injectable} from '@nestjs/common';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {UpdatePermissionDto} from './dto/update-permission.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Permission} from "./entities/permission.entity";
import {Repository} from "typeorm";

@Injectable()
export class PermissionsService {

    constructor(@InjectRepository(Permission) private permissionsRepository: Repository<Permission>) {
    }

    create(createPermissionDto: CreatePermissionDto) {
        return 'This action adds a new permission';
    }

    findAll() {
        return `This action returns all permissions`;
    }

    findOne(id: number) {
        return `This action returns a #${id} permission`;
    }

    update(id: number, updatePermissionDto: UpdatePermissionDto) {
        return `This action updates a #${id} permission`;
    }

    remove(id: number) {
        return `This action removes a #${id} permission`;
    }

    async getPermissions(id: number): Promise<Permission[]> {
        return await this.permissionsRepository.createQueryBuilder("permission")
            .leftJoin("permission.roles", "role")
            .leftJoinAndSelect("permission.permissionObject", "permissionObject")
            .where("role.id = :id", {id: id})
            .getMany();
    }
}
