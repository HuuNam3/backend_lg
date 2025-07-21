import { Test, TestingModule } from '@nestjs/testing';
import { CourseCategoriesController } from './course-introduction.controller';
import { CourseCategoriesService } from './course-introduction.service';

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
