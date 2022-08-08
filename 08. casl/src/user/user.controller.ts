import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AbilityFactory, Action } from "../ability/ability.factory";
import { User } from "./entities/user.entity";
import { ForbiddenError } from "@casl/ability";
import { CheckAbilities } from "../ability/abilities.decorator";
import { AbilitiesGuard } from "../ability/abilities.guard";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly abilityFactory: AbilityFactory
  ) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {


    // one way of doing
    // const isAllowed = ability.can(Action.Create, User);
    // if (!isAllowed) {
    //   throw new ForbiddenException();
    // }

    // 2nd way of doing
    const user: User = { id: 1, isAdmin: true, orgId: 2 };

    try {
      return this.userService.create(createUserDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get("/:id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    const user: User = { id: 1, isAdmin: true, orgId: 2 };

    try {
      return this.userService.update(+id, updateUserDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }

  @Delete(":id")
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: User })
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
