import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "A new user name", description: "A random user name!" })
  @IsString()
  name: string;
  @ApiProperty({ example: "anewusername@gmail.com", description: "A random user email!" })
  @IsEmail()
  email: string;
  @ApiProperty({ example: "complexPassword", description: "A random user password!" })
  @IsString()
  password: string;
}
