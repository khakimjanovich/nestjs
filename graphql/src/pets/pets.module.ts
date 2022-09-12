import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';

@Module({
  providers: [PetsService, PetsResolver],
  imports: [TypeOrmModule.forFeature([Pet])],
})
export class PetsModule {}
