import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";

@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.permissionsService.findOneById(+id);
  }

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }
}
