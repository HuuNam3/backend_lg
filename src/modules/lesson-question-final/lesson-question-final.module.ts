import { Module } from '@nestjs/common';
import { LessonQuestionFinalService } from './lesson-question-final.service';
import { LessonQuestionFinalController } from './lesson-question-final.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LessonQuestionFinal,
  LessonQuestionFinalSchema,
} from 'src/schemas/lesson-question-final.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LessonQuestionFinal.name, schema: LessonQuestionFinalSchema },
    ]),
  ],
  controllers: [LessonQuestionFinalController],
  providers: [LessonQuestionFinalService],
})
export class LessonQuestionFinalModule {}
