import { Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export type Subjects = InferSubjects<typeof User> | "all";
export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, "all");
      cannot(
        Action.Manage,
        User,
        { orgId: { $ne: user.orgId } }
      ).because("You can only manage users in your own organization!");
    } else {
      can(Action.Read, User).because('You cannot because');
    }

    return build({
        detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
      }
    );
  }
}
