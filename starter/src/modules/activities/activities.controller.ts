import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ActivitiesService } from "./activities.service";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetIndexActivitiesDto } from "./dtos/get-index-activities.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Activities log")
@UseGuards(JwtAuthGuard)
@Controller("activities")
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {
  }

  @ApiOperation({ summary: "Getting what happened when!" })
  @ApiOkResponse({
    description: "this is the description of the activities route!", schema: {
      example: {
        data: [
          {
            id: 1,
            name: "User has created this entity",
            request_type: "POST",
            request_url: "/permissions",
            created_at: "2022-01-02",
            updated_at: "2022-01-02",
            userId: 1
          }
        ],
        count: 3
      }
    }
  })
  @Get()
  findAll(@Query() { take, skip }: GetIndexActivitiesDto) {
    return this.activitiesService.findAll({ skip, take });
  }
}
