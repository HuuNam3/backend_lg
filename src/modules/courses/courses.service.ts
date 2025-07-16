import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    console.log('📦 DB connected to collection:', courseModel.collection.name);
    console.log('✅ Connected DB:', this.connection.name);
  }

  findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  create(course: Partial<Course>) {
    return this.courseModel.create(course);
  }
}
