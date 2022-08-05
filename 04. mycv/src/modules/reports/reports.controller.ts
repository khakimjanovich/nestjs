import {Body, Controller, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {ReportsService} from "./reports.service";
import {AuthGuard} from "../../bootstrap/guards/auth.guard";
import {CurrentUser} from "../users/decorators/current-user.decorator";
import {User} from "../users/user.entity";
import {ReportDto} from "./dtos/report.dto";
import {Serialize} from "../../bootstrap/interceptors/serialize.interceptor";
import {ApproveReportDto} from "./dtos/approve-report.dto";

@Controller('reports')
export class ReportsController {

    constructor(private reportsRepository: ReportsService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsRepository.create(body, user)
    }

    @Patch('/:id')
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsRepository.approve(id, body.approved)
    }
}
