import { Test, TestingModule } from '@nestjs/testing';
import { LessonPronounceController } from './lesson-pronounce.controller';
import { LessonPronounceService } from './lesson-pronounce.service';

describe('LessonPronounceController', () => {
  let controller: LessonPronounceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonPronounceController],
      providers: [LessonPronounceService],
    }).compile();

    controller = module.get<LessonPronounceController>(
      LessonPronounceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
