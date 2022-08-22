import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { Permission } from "../../permissions/entities/permission.entity";
import { Activity } from "../../activities/entities/activity.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "users" })
export class User {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Anderson John", description: "Name of the user." })
  @Column()
  name: string;

  @ApiProperty({ example: "Andersonjohn@gmail.com", description: "Email of the user." })
  @Column()
  email: string;

  @Column({  })
  password: string;

  @ApiProperty({ example: "2022-01-02", description: "Created at timestamp." })
  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @ApiProperty({ example: "2022-01-02", description: "Updated at timestamp." })
  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => Activity, (activities) => activities.user)
  activities: Activity[];
}
