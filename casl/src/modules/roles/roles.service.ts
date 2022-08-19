import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {Role} from "./entities/role.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PermissionsService} from "../permissions/permissions.service";

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>, private permissionsService: PermissionsService) {
    }

    create(createRoleDto: CreateRoleDto) {
        return 'This action adds a new role';
    }

    findAll() {
        return `This action returns all roles`;
    }

    findOne(id: number) {
        return `This action returns a #${id} role`;
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    remove(id: number) {
        return `This action removes a #${id} role`;
    }

    getPermissions(role: Role) {
        return this.permissionsService.getPermissions(role.id)
    }
}
