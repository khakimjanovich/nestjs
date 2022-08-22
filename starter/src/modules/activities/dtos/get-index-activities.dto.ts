import { ApiProperty } from "@nestjs/swagger";

export class GetIndexActivitiesDto {
  @ApiProperty({ example: "10", description: "Pagination variables" })
  take: string;
  @ApiProperty({ example: "10", description: "Pagination variables" })
  skip: string;
  @ApiProperty({ example: "Permissions", description: "Search by name!", required: false })
  keyword: string;
}