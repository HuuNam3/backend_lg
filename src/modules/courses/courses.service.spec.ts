import { Test, TestingModule } from '@nestjs/testing';
import { CourseCategoriesService } from './courses.service';

describe('CourseCategoriesService', () => {
  let service: CourseCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseCategoriesService],
    }).compile();

    service = module.get<CourseCategoriesService>(CourseCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
