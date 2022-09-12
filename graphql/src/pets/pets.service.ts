import { Injectable } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dtos/create-pet.dto';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  createPet(createPetDto: CreatePetDto): Promise<Pet> {
    return this.petsRepository.save(this.petsRepository.create(createPetDto));
  }
}
