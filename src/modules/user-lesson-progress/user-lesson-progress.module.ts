import { Module } from '@nestjs/common';
import { UserLessonProgressService } from './user-lesson-progress.service';
import { UserLessonProgressController } from './user-lesson-progress.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserLessonProgress,
  UserLessonProgressSchema,
} from '../../schemas/user-lesson-progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserLessonProgress.name, schema: UserLessonProgressSchema },
    ]),
  ],
  controllers: [UserLessonProgressController],
  providers: [UserLessonProgressService],
  exports: [UserLessonProgressService],
})
export class UserLessonProgressModule {}
