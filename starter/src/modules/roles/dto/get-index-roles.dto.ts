import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class GetIndexRolesDto {
  @ApiProperty({ example: "10", description: "Pagination variables" })
  @Transform(({ value }) => parseInt(value))
  take: string;
  @ApiProperty({ example: "10", description: "Pagination variables" })
  @Transform(({ value }) => parseInt(value))
  skip: string;
  @ApiProperty({ example: "Admin", description: "Search by name!", required: false })
  keyword: string;
}