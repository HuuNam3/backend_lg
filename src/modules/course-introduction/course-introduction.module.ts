import { Module } from '@nestjs/common';
import { CourseIntroductionService } from './course-introduction.service';
import { CourseIntroductionController } from './course-introduction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourseIntroduction,
  CourseIntroductionSchema,
} from '../../schemas/course-introduction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseIntroduction.name, schema: CourseIntroductionSchema },
    ]),
  ],
  controllers: [CourseIntroductionController],
  providers: [CourseIntroductionService],
})
export class CourseIntroductionModule {}
