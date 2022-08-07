import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Role} from "./entities/role.enum";
import {User} from "./entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ])


        if (!requiredRoles) {
            return true;
        }

        // const {user} = context.switchToHttp().getRequest();

        const user: User = {
            name: 'Marius',
            roles: [Role.ADMIN]
        }

        return requiredRoles.some((role) => user.roles.includes(role))
    }

}