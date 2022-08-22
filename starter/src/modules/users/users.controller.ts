import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetIndexUsersDto } from "./dto/get-index-users.dto";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Users")
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({ summary: "Getting the list of the users!" })
  @ApiResponse({
    status: 200, schema: {
      example: {
        data: [
          {
            id: 1,
            name: "User name",
            email: "admin@admin.com",
            created_at: "2022-01-02",
            updated_at: "2022-01-02"
          }
        ],
        count: 3
      }
    }
  })
  @Get()
  index(@Query() { page, page_size, search }: GetIndexUsersDto) {
    return this.usersService.paginate({ page, page_size, search });
  }

  @ApiOperation({ summary: "Getting the specific user!" })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          name: "User name",
          email: "admin@admin.com",
          created_at: "2022-01-02",
          updated_at: "2022-01-02"
        }
      }
    }
  })
  @Get(":id")
  show(@Param("id") id: string) {
    return this.usersService.findOneById(+id);
  }

  @ApiOperation({ summary: "Storing a new user!" })
  @ApiCreatedResponse({
    schema: {
      example: {
        data: {
          id: 1,
          name: "User name",
          email: "admin@admin.com",
          created_at: "2022-01-02",
          updated_at: "2022-01-02"
        }
      }
    }
  })
  @Post()
  store(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Updating the specific user!" })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          name: "User name",
          email: "admin@admin.com",
          created_at: "2022-01-02",
          updated_at: "2022-01-02"
        }
      }
    }
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }


  @ApiOperation({ summary: "Updating the specific user's password!" })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          name: "User name",
          email: "admin@admin.com",
          created_at: "2022-01-02",
          updated_at: "2022-01-02"
        }
      }
    }
  })
  @Patch("/:id/password")
  updatePassword(@Param("id") id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(+id, updateUserPasswordDto);
  }
}
