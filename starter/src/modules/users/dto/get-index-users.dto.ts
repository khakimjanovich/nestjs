import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class GetIndexUsersDto {
  @ApiProperty({ example: "10", description: "Page of the list" })
  @Transform(({ value }) => parseInt(value))
  page: string;
  @ApiProperty({ example: "1", description: "Page entity size" })
  @Transform(({ value }) => parseInt(value))
  page_size: string;
  @ApiProperty({ example: "Admin", description: "Search by name!", required: false })
  search: string;
}