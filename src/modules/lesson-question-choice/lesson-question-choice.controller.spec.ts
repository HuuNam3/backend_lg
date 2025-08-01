import { Test, TestingModule } from '@nestjs/testing';
import { LessonQuestionChoiceController } from './lesson-question-choice.controller';
import { LessonQuestionChoiceService } from './lesson-question-choice.service';

describe('LessonQuestionChoiceController', () => {
  let controller: LessonQuestionChoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonQuestionChoiceController],
      providers: [LessonQuestionChoiceService],
    }).compile();

    controller = module.get<LessonQuestionChoiceController>(
      LessonQuestionChoiceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
