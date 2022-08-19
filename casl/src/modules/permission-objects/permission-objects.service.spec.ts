import { Test, TestingModule } from '@nestjs/testing';
import { PermissionObjectsService } from './permission-objects.service';

describe('PermissionObjectsService', () => {
  let service: PermissionObjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionObjectsService],
    }).compile();

    service = module.get<PermissionObjectsService>(PermissionObjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
