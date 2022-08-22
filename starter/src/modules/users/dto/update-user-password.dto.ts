import { IsString, Min } from "class-validator";

export class UpdateUserPasswordDto {
  @IsString()
  @Min(6)
  password: string;

  @IsString()
  @Min(6)
  password_confirmation: string;
}