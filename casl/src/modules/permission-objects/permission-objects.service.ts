import { Injectable } from '@nestjs/common';
import { CreatePermissionObjectDto } from './dto/create-permission-object.dto';
import { UpdatePermissionObjectDto } from './dto/update-permission-object.dto';

@Injectable()
export class PermissionObjectsService {
  create(createPermissionObjectDto: CreatePermissionObjectDto) {
    return 'This action adds a new permissionObject';
  }

  findAll() {
    return `This action returns all permissionObjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionObject`;
  }

  update(id: number, updatePermissionObjectDto: UpdatePermissionObjectDto) {
    return `This action updates a #${id} permissionObject`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionObject`;
  }
}
