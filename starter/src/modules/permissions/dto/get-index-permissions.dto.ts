import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class GetIndexPermissionsDto {
  @ApiProperty({ example: "10", description: "Pagination variables" })
  @Transform(({ value }) => parseInt(value))
  page: string;
  @ApiProperty({ example: "10", description: "Pagination variables" })
  @Transform(({ value }) => parseInt(value))
  page_size: string;
  @ApiProperty({ example: "Permissions", description: "Search by name!", required: false })
  search: string;
}