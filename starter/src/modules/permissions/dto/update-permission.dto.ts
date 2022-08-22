import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePermissionDto {
  @ApiProperty({ example: "Read permission edit", description: "Label of the permission!" })
  @IsString()
  label: string;
}
