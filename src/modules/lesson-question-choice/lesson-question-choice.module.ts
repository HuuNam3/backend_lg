import { Module } from '@nestjs/common';
import { LessonQuestionChoiceService } from './lesson-question-choice.service';
import { LessonQuestionChoiceController } from './lesson-question-choice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LessonQuestionChoice,
  LessonQuestionChoiceSchema,
} from 'src/schemas/lesson-question-choice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LessonQuestionChoice.name, schema: LessonQuestionChoiceSchema },
    ]),
  ],
  controllers: [LessonQuestionChoiceController],
  providers: [LessonQuestionChoiceService],
})
export class LessonQuestionChoiceModule {}
