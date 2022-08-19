import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Permission} from "../../permissions/entities/permission.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @OneToMany(type => User, users => users.role)
    users: User[];

    @ManyToMany(type => Permission)
    @JoinTable()
    permissions: Permission[];
}
