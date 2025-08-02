import { Test, TestingModule } from '@nestjs/testing';
import { LessonQuestionFinalService } from './lesson-question-final.service';

describe('LessonQuestionFinalService', () => {
  let service: LessonQuestionFinalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonQuestionFinalService],
    }).compile();

    service = module.get<LessonQuestionFinalService>(
      LessonQuestionFinalService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
