import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CoursesSchema } from '../../schemas/courses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Courses.name, schema: CoursesSchema }]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
