import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateReportDto} from "./dtos/create-report.dto";
import {Report} from "./report.entity";
import {User} from "../users/user.entity";

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportsRepository: Repository<Report>) {
    }

    async create(reportDto: CreateReportDto, user: User) {
        const report = await this.reportsRepository.create(reportDto)
        report.user = user;

        return this.reportsRepository.save(report)
    }

    async approve(id: string, approved: boolean) {
        const report = await this.findOneById(parseInt(id))
        if (!report) {
            throw new NotFoundException('Report not found!')
        }

        report.approved = approved
        return this.reportsRepository.save(report)
    }

    private async findOneById(id: number) {
        return this.reportsRepository.findOne({where: {id}})
    }
}
