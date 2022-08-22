import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: "User name", description: "Name of the user!" })
  @IsString()
  name: string;

  @ApiProperty({ example: "updated@email.com", description: "Email of the user!" })
  @IsEmail()
  email: string;
}
