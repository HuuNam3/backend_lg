import { Test, TestingModule } from '@nestjs/testing';
import { LessonQuestionFinalController } from './lesson-question-final.controller';
import { LessonQuestionFinalService } from './lesson-question-final.service';

describe('LessonQuestionFinalController', () => {
  let controller: LessonQuestionFinalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonQuestionFinalController],
      providers: [LessonQuestionFinalService],
    }).compile();

    controller = module.get<LessonQuestionFinalController>(
      LessonQuestionFinalController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
