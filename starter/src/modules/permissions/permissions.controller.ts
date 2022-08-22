import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { Permission } from "./entities/permission.entity";
import { GetIndexPermissionsDto } from "./dto/get-index-permissions.dto";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Permissions")
@UseGuards(JwtAuthGuard)
@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {
  }

  @ApiOperation({ summary: "Getting the list of the permissions!" })
  @ApiOkResponse({
    schema: {
      example: {
        data: [
          {
            id: 1,
            name: "permissions.index",
            label: "Browse Permission",
            created_at: "2022-01-02",
            updated_at: "2022-01-02"
          }
        ],
        page: 1,
        page_size: 10,
        count: 13
      }
    }
  })
  @Get()
  index(@Query() { page, page_size, search }: GetIndexPermissionsDto) {
    return this.permissionsService.paginate({ page, page_size, search });
  }

  @ApiOperation({ summary: "Getting the specific permission!" })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          name: "permissions.index",
          label: "Read permission edit",
          created_at: "2022-08-08T13:35:58.000Z",
          updated_at: "2022-08-10T21:35:43.000Z"
        }
      }
    }
  })
  @Get(":id")
  show(@Param("id") id: string): Promise<{ data: Permission }> {
    return this.permissionsService.findOneById(+id);
  }

  @ApiOperation({ summary: "Storing a permission!" })
  @ApiCreatedResponse({
    schema: {
      example: {
        data: Permission
      }
    }
  })
  @Post()
  store(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @ApiOperation({ summary: "Updating a specific permission!" })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          name: "permissions.index",
          label: "Read permission edit",
          created_at: "2022-08-08T13:35:58.000Z",
          updated_at: "2022-08-10T21:35:43.000Z"
        }
      }
    }
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<{ data: Permission }> {
    return this.permissionsService.update(+id, updatePermissionDto);
  }
}
