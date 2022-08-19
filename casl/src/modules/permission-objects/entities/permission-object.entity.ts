import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class PermissionObject {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
