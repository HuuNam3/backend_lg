import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import {
  UserLessonProgress,
  UserLessonProgressDocument,
} from '../../schemas/user-lesson-progress.schema';
import { UpdateCourseCategoryDto } from '../../dto/update-course-category.dto';
import { checkCollections, includeHandle } from 'src/lib/include-handle';

@Injectable()
export class UserLessonProgressService {
  constructor(
    @InjectModel(UserLessonProgress.name)
    private TModel: Model<UserLessonProgressDocument>,
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

  async findOne(id: string, includes?: string): Promise<any> {
    if (!checkCollections(includes)) {
      return await this.TModel.findById(id).exec();
    }
    const include = includeHandle(includes, id);
    if (include) {
      const res: UserLessonProgress[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async getLessonComplete(coursesId: string) {
    const completeLesson = await this.TModel.countDocuments({
      course_id: new Types.ObjectId(coursesId),
      status: 'isComplete',
    });
    return completeLesson;
  }

  async create(data: Partial<UserLessonProgress>) {
    return await this.TModel.create(data);
  }

  async update(
    id: string,
    updateDto: UpdateCourseCategoryDto,
  ): Promise<UserLessonProgress | null> {
    return await this.TModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    }).exec();
  }

  async delete(id: string) {
    return await this.TModel.findByIdAndDelete(id);
  }
}
