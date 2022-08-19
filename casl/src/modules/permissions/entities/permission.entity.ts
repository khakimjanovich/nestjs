import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PermissionObject} from "../../permission-objects/entities/permission-object.entity";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    action: string;

    @ManyToOne(type => PermissionObject)
    permissionObject: PermissionObject;
}
