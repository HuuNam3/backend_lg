import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import {
  UserCourses,
  UserCoursesDocument,
} from '../../schemas/user-courses.schema';
import { UpdateCourseCategoryDto } from '../../dto/update-course-category.dto';
import { checkCollections, includeHandle } from 'src/lib/include-handle';

@Injectable()
export class UserCoursesService {
  constructor(
    @InjectModel(UserCourses.name)
    private TModel: Model<UserCoursesDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findAll(includes?: string): Promise<any> {
    if (!checkCollections(includes)) {
      return await this.TModel.find().exec();
    }
    const include = includeHandle(includes);
    if (include) {
      return await this.TModel.aggregate(include);
    }
  }

  async getMyCourses(id: string): Promise<object> {
    const coursesEnrolled = await this.TModel.countDocuments({
      user_id: id,
    });
    const lessonsCompleted = await this.TModel.countDocuments({
      user_id: id,
      progress: 100,
    });
    return {
      coursesEnrolled,
      lessonsCompleted,
    };
  }

  async getListMyCourses(id: string): Promise<any> {
    const aggregate = [
      { $match: { user_id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'courses',
          localField: 'course_id',
          foreignField: '_id',
          as: 'course',
        },
      },
      { $unwind: '$course' },
    ];
    return await this.TModel.aggregate(aggregate);
  }

  async isUserRegistered(courseId: string, userId: string): Promise<boolean> {
    const exist = await this.TModel.exists({
      course_id: new Types.ObjectId(courseId),
      user_id: new Types.ObjectId(userId),
    });
    if (exist) {
      return true;
    }
    return false;
  }

  async findOne(id: string, includes?: string): Promise<any> {
    if (!checkCollections(includes)) {
      return await this.TModel.findById(id).exec();
    }
    const include = includeHandle(includes, id);
    if (include) {
      const res: UserCourses[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async create(data: Partial<UserCourses>) {
    return await this.TModel.create(data);
  }

  async update(
    id: string,
    updateDto: UpdateCourseCategoryDto,
  ): Promise<UserCourses | null> {
    return await this.TModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    }).exec();
  }

  async delete(id: string) {
    return await this.TModel.findByIdAndDelete(id);
  }
}
