import { Test, TestingModule } from '@nestjs/testing';
import { CourseCategoriesController } from './lessons.controller';
import { CourseCategoriesService } from './lessons.service';

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
