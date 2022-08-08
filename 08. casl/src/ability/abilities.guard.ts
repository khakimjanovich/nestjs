import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AbilityFactory } from "./ability.factory";
import { CHECK_ABILITY, RequiredRule } from "./abilities.decorator";
import { User } from "../user/entities/user.entity";
import { ForbiddenError } from "@casl/ability";

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler) || [];

    // const { user } = context.switchToHttp().getRequest()
    const currentUser: User = { id: 1, orgId: 2, isAdmin: false };
    const ability = this.abilityFactory.defineAbility(currentUser);

    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
      });
      return rules.every((rule) => ability.can(rule.action, rule.subject));
    } catch (error) {
      if (error instanceof Error) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}