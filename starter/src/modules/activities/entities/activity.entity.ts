import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "activities" })
export class Activity {
  @ApiProperty({ example: "1", description: "Unique ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Permissions was updated!", description: "Specific comment for the action" })
  @Column({})
  name: string;

  @ApiProperty({ example: "POST", description: "Type of the operation was held by the client/robot" })
  @Column({ nullable: true })
  request_type: string;

  @ApiProperty({ example: "/permissions", description: "The route was used" })
  @Column({ nullable: true })
  request_url: string;

  @ApiProperty({ example: "", description: "The created at timestamp" })
  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @ApiProperty({ example: "", description: "The updated at timestamp" })
  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;

  @ApiProperty({ example: "", description: "The user relation entity" })
  @ManyToOne(() => User, (user) => user.activities)
  user: User;
}
