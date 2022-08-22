import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetIndexRolesDto } from "./dto/get-index-roles.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Roles")
@UseGuards(JwtAuthGuard)
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
  }

  @ApiOperation({ summary: "Getting the list of the roles!" })
  @ApiResponse({
    status: 200, schema: {
      example: {
        data: [
          {
            id: 1,
            name: "admin",
            label: "Admin",
            created_at: "2022-01-02",
            updated_at: "2022-01-02"
          }
        ],
        count: 20
      }
    }
  })
  @Get()
  index(@Query() { take, skip, keyword }: GetIndexRolesDto) {
    return this.rolesService.paginate({take,skip,keyword});
  }

  @ApiOperation({ summary: "Getting the specific role!" })
  @ApiResponse({
    status: 200, schema: {
      example: {
        "data": {
          "id": 1,
          "name": "admin",
          "label": "Admin",
          "created_at": "2022-08-08T13:35:58.000Z",
          "updated_at": "2022-08-10T21:35:43.000Z"
        }
      }
    }
  })
  @Get(":id")
  show(@Param("id") id: string) {
    return this.rolesService.findOneById(+id);
  }

  @ApiOperation({ summary: "Storing a new role!" })
  @ApiResponse({
    status: 201, schema: {
      example: {
        "data": {
          "id": 1,
          "name": "admin",
          "label": "Admin",
          "created_at": "2022-08-08T13:35:58.000Z",
          "updated_at": "2022-08-10T21:35:43.000Z"
        }
      }
    }
  })
  @Post()
  store(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({ summary: "Updating a specific role!" })
  @ApiResponse({
    status: 200, schema: {
      example: {
        "data": {
          "id": 1,
          "name": "admin",
          "label": "Admin Updated",
          "created_at": "2022-08-08T13:35:58.000Z",
          "updated_at": "2022-08-10T21:35:43.000Z"
        }
      }
    }
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }
}
