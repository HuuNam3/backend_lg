import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import {
  CourseCategories,
  CourseCategoriesDocument,
} from './schemas/course-categories.schema';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';

@Injectable()
export class CourseCategoriesService {
  constructor(
    @InjectModel(CourseCategories.name)
    private CourseCategoriesModel: Model<CourseCategoriesDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findAll(): Promise<CourseCategories[]> {
    return this.CourseCategoriesModel.find().exec();
  }

  async find(id: string): Promise<CourseCategories | null> {
    return this.CourseCategoriesModel.findById(id).exec();
  }

  async create(course: Partial<CourseCategories>) {
    return this.CourseCategoriesModel.create(course);
  }

  async update(
    id: string,
    updateCourseCategoryDto: UpdateCourseCategoryDto,
  ): Promise<CourseCategories | null> {
    return this.CourseCategoriesModel.findByIdAndUpdate(
      id,
      updateCourseCategoryDto,
      { new: true },
    ).exec();
  }

  async delete(id: string) {
    return this.CourseCategoriesModel.findByIdAndDelete(id);
  }
}
