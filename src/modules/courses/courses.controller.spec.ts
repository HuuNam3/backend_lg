import { Test, TestingModule } from '@nestjs/testing';
import { CourseCategoriesController } from './courses.controller';
import { CourseCategoriesService } from './courses.service';

describe('CourseCategoriesController', () => {
  let controller: CourseCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseCategoriesController],
      providers: [CourseCategoriesService],
    }).compile();

    controller = module.get<CourseCategoriesController>(
      CourseCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
