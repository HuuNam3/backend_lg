import { Module } from '@nestjs/common';
import { CourseCategoriesService } from './course-categories.service';
import { CourseCategoriesController } from './course-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourseCategories,
  CourseCategoriesSchema,
} from '../../schemas/course-categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseCategories.name, schema: CourseCategoriesSchema },
    ]),
  ],
  controllers: [CourseCategoriesController],
  providers: [CourseCategoriesService],
})
export class CourseCategoriesModule {}
