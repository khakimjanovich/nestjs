import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({example:'admin',description:'Name of the role'})
  @IsString()
  name: string;
  @ApiProperty({example:'Admin',description:'Label of the role'})
  @IsString()
  label: string;
}
