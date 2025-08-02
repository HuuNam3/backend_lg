import { Test, TestingModule } from '@nestjs/testing';
import { LessonPronounceService } from './lesson-pronounce.service';

describe('LessonPronounceService', () => {
  let service: LessonPronounceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonPronounceService],
    }).compile();

    service = module.get<LessonPronounceService>(LessonPronounceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
