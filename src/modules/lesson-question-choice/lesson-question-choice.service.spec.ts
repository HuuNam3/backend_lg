import { Test, TestingModule } from '@nestjs/testing';
import { LessonQuestionChoiceService } from './lesson-question-choice.service';

describe('LessonQuestionChoiceService', () => {
  let service: LessonQuestionChoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonQuestionChoiceService],
    }).compile();

    service = module.get<LessonQuestionChoiceService>(
      LessonQuestionChoiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
