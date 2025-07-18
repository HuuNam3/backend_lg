import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
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

  async findAll(includes?: string): Promise<CourseCategories[]> {
    const include = [
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: 'course_categories_id',
          as: 'courses',
        },
      },
    ];
    if (includes == 'courses') {
      return await this.CourseCategoriesModel.aggregate(include);
    } else {
      return await this.CourseCategoriesModel.find().exec();
    }
  }

  async find(id: string, includes?: string): Promise<CourseCategories | null> {
    const include = [
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: 'course_categories_id',
          as: 'courses',
        },
      },
    ];
    if (includes == 'courses') {
      const res: CourseCategories[] =
        await this.CourseCategoriesModel.aggregate(include);
      return res[0] || null;
    } else {
      return await this.CourseCategoriesModel.findById(id).exec();
    }
  }

  async create(course: Partial<CourseCategories>) {
    return await this.CourseCategoriesModel.create(course);
  }

  async update(
    id: string,
    updateCourseCategoryDto: UpdateCourseCategoryDto,
  ): Promise<CourseCategories | null> {
    return await this.CourseCategoriesModel.findByIdAndUpdate(
      id,
      updateCourseCategoryDto,
      { new: true },
    ).exec();
  }

  async delete(id: string) {
    return await this.CourseCategoriesModel.findByIdAndDelete(id);
  }
}
