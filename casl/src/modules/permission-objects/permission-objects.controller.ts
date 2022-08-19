import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionObjectsService } from './permission-objects.service';
import { CreatePermissionObjectDto } from './dto/create-permission-object.dto';
import { UpdatePermissionObjectDto } from './dto/update-permission-object.dto';

@Controller('permission-objects')
export class PermissionObjectsController {
  constructor(private readonly permissionObjectsService: PermissionObjectsService) {}

  @Post()
  create(@Body() createPermissionObjectDto: CreatePermissionObjectDto) {
    return this.permissionObjectsService.create(createPermissionObjectDto);
  }

  @Get()
  findAll() {
    return this.permissionObjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionObjectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionObjectDto: UpdatePermissionObjectDto) {
    return this.permissionObjectsService.update(+id, updatePermissionObjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionObjectsService.remove(+id);
  }
}
