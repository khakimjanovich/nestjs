import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Activity } from "./entities/activity.entity";
import { Repository } from "typeorm";

@Injectable()
export class ActivitiesService {
  constructor(@InjectRepository(Activity) private activityRepository: Repository<Activity>) {
  }

  async findAll(query) {
    const take: number = +query.take || 10;
    const skip: number = +query.skip || 0;

    const [data, count] = await this.activityRepository.createQueryBuilder().orderBy("created_at", "DESC").setFindOptions({
      skip,
      take
    }).getManyAndCount();

    return {
      data,
      count
    };
  }
}
