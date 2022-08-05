import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateReportDto} from "./dtos/create-report.dto";
import {Report} from "./report.entity";
import {User} from "../users/user.entity";
import {GetEstimateDto} from './dtos/get-estimate.dto';

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

    createEstimate({make, model, ltd, lng, mileage, year}: GetEstimateDto) {
        return this.reportsRepository.createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('make = :make', {make})
            .andWhere('model = :model', {model})
            .andWhere('lng - :lng BETWEEN -5 and 5', {lng})
            .andWhere('ltd - :ltd BETWEEN -5 and 5', {ltd})
            .andWhere('year - :year BETWEEN -3 and 3', {year})
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({mileage})
            .limit(3)
            .getRawMany()
    }

    private async findOneById(id: number) {
        return this.reportsRepository.findOne({where: {id}})
    }
}
