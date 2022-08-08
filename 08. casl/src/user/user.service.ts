import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ForbiddenError } from "@casl/ability";
import { AbilityFactory, Action } from "../ability/ability.factory";

@Injectable()
export class UserService {
  constructor(private readonly abilityFactory: AbilityFactory) {
  }

  create(createUserDto: CreateUserDto, currentUser: User) {
    const ability = this.abilityFactory.defineAbility(currentUser);
    ForbiddenError.from(ability).setMessage("Cannot create unless an admin").throwUnlessCan(Action.Create, User);

    return "This action adds a new user";
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    const user = new User();
    user.id = id;
    user.orgId = 1;

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto, currentUser: User) {
    const ability = this.abilityFactory.defineAbility(currentUser);
    const userToUpdate = this.findOne(+id);
    ForbiddenError.from(ability).throwUnlessCan(Action.Update, userToUpdate);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
