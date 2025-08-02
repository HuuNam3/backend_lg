import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { UpdateCourseCategoryDto } from '../../dto/update-course-category.dto';
import { checkCollections, includeHandle } from 'src/lib/include-handle';
import {
  LessonPronounce,
  LessonPronounceDocument,
} from 'src/schemas/lesson-pronounce.schema';

@Injectable()
export class LessonPronounceService {
  constructor(
    @InjectModel(LessonPronounce.name)
    private TModel: Model<LessonPronounceDocument>,
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

  async findLessonId(lessonId: string, includes?: string): Promise<any> {
    if (!checkCollections(includes)) {
      return await this.TModel.findOne({
        lesson_id: new Types.ObjectId(lessonId),
      }).exec();
    }
    const include = includeHandle(includes);
    if (include) {
      const res: LessonPronounce[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async findOne(id: string, includes?: string): Promise<any> {
    if (!checkCollections(includes)) {
      return await this.TModel.findById(id).exec();
    }
    const include = includeHandle(includes, id);
    if (include) {
      const res: LessonPronounce[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async create(data: Partial<LessonPronounce>) {
    return await this.TModel.create(data);
  }

  async update(
    id: string,
    updateDto: UpdateCourseCategoryDto,
  ): Promise<LessonPronounce | null> {
    return await this.TModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    }).exec();
  }

  async delete(id: string) {
    return await this.TModel.findByIdAndDelete(id);
  }
}
