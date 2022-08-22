import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRoleDto {
  @ApiProperty({example:"Admin updated label", description:"Only label can be updated!"})
  @IsString()
  label: string;
}
