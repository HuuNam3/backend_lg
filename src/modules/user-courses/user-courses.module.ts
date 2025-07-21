import { Module } from '@nestjs/common';
import { UserCoursesService } from './user-courses.service';
import { UserCoursesController } from './user-courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserCourses,
  UserCoursesSchema,
} from '../../schemas/user-courses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCourses.name, schema: UserCoursesSchema },
    ]),
  ],
  controllers: [UserCoursesController],
  providers: [UserCoursesService],
})
export class UserCoursesModule {}
