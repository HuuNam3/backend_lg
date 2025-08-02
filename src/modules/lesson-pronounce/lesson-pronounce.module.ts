import { Module } from '@nestjs/common';
import { LessonPronounceService } from './lesson-pronounce.service';
import { LessonPronounceController } from './lesson-pronounce.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LessonPronounce,
  LessonPronounceSchema,
} from 'src/schemas/lesson-pronounce.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LessonPronounce.name, schema: LessonPronounceSchema },
    ]),
  ],
  controllers: [LessonPronounceController],
  providers: [LessonPronounceService],
})
export class LessonPronounceModule {}
