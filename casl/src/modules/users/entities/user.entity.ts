import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Role} from "../../roles/entities/role.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty({example: 1, description: "Unique ID"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: "Anderson John", description: "Name of the user."})
    @Column()
    name: string;

    @ApiProperty({example: "Andersonjohn@gmail.com", description: "Email of the user."})
    @Column()
    email: string;

    @Column()
    password: string

    @ApiProperty({example: "2022-01-02", description: "Created at timestamp."})
    @CreateDateColumn({name: "created_at"})
    created_at: Date;

    @ApiProperty({example: "2022-01-02", description: "Updated at timestamp."})
    @UpdateDateColumn({name: "updated_at"})
    updated_at: Date;

    @ManyToOne(type => Role, role => role.users)
    role: Role;
}
