import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lessons, LessonsSchema } from '../../schemas/lessons.schema';
import { UserLessonProgressModule } from '../user-lesson-progress/user-lesson-progress.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lessons.name, schema: LessonsSchema }]),
    UserLessonProgressModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
