import { IsEmail, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example:"User name", description:"Name of the user!"})
  @IsString()
  name: string;

  @ApiProperty({example:"created@email.com", description:"Email of the user!"})
  @IsEmail()
  email: string;

  @ApiProperty({example:"somerandompassword", description:"Password of the user!"})
  @IsString()
  password: string;
}
