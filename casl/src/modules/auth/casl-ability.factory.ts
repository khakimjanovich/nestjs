import {Ability} from "@casl/ability";
import {Injectable} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {User} from "../users/entities/user.entity";
import {Permission} from "../permissions/entities/permission.entity";

export enum PermissionAction {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete",
}

export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;

interface CaslPermission {
    action: PermissionAction;
    // In our database, Invoice, Project... are called "object"
    // but in CASL they are called "subject"
    subject: string;
}

@Injectable()
export class CaslAbilityFactory {
    constructor(private authoService: AuthService) {
    }

    async createForUser(user: User): Promise<AppAbility> {
        const dbPermissions: Permission[] = await this.authoService.findAllPermissionsOfUser(user);
        // @ts-ignore
        const caslPermissions: CaslPermission[] = dbPermissions.map(p => ({
            action: p.action,
            subject: p.permissionObject.name,
        }));
        return new Ability<[PermissionAction, PermissionObjectType]>(caslPermissions);
    }
}