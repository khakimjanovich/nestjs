import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "permissions" })
export class Permission {
  @ApiProperty({ example: "1", description: "Unique ID" })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: "permissions.index", description: "Specifies that a user can see the permissions list!" })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: "Browse permissions", description: "The label of the permission" })
  @Column()
  label: string;

  @ApiProperty({ example: "2022-01-02", description: "The created at timestamp" })
  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @ApiProperty({ example: "2022-01-02", description: "The updated at timestamp" })
  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
