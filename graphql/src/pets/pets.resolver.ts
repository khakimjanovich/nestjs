import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dtos/create-pet.dto';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query((returns) => [Pet])
  index(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Mutation((returns) => Pet)
  createPet(@Args('createPetDto') createPetDto: CreatePetDto): Promise<Pet> {
    return this.petsService.createPet(createPetDto);
  }
}
