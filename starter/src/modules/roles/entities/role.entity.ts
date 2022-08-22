import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Permission } from "../../permissions/entities/permission.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "roles" })
export class Role {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "admin", description: "The name of the role" })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: "Admin", description: "The label of the role" })
  @Column()
  label: string;

  @ApiProperty({ example: "2022-01-02", description: "The created at timestamp" })
  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @ApiProperty({ example: "2022-01-02", description: "The updated at timestamp" })
  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
