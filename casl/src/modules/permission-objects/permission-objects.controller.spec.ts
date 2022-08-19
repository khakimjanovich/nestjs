import { Test, TestingModule } from '@nestjs/testing';
import { PermissionObjectsController } from './permission-objects.controller';
import { PermissionObjectsService } from './permission-objects.service';

describe('PermissionObjectsController', () => {
  let controller: PermissionObjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionObjectsController],
      providers: [PermissionObjectsService],
    }).compile();

    controller = module.get<PermissionObjectsController>(PermissionObjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
