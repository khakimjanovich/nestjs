import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePermissionDto {
  @ApiProperty({example:'permissions.show',description:'Name of the permission'})
  @IsString()
  name: string;
  @ApiProperty({example:'Read permissions',description:'Label of the permission'})
  @IsString()
  label: string;
}
