import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import {
  LessonVideos,
  LessonVideosDocument,
} from '../../schemas/lesson-videos.schema';
import { UpdateCourseCategoryDto } from '../../dto/update-course-category.dto';
import { checkCollections, includeHandle } from 'src/lib/include-handle';

@Injectable()
export class LessonVideosService {
  constructor(
    @InjectModel(LessonVideos.name)
    private TModel: Model<LessonVideosDocument>,
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
      const res: LessonVideos[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async findOne(id: string, includes?: string): Promise<any> {
    if (!checkCollections(includes)) {
      return await this.TModel.findById(id).exec();
    }
    const include = includeHandle(includes, id);
    if (include) {
      const res: LessonVideos[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async create(data: Partial<LessonVideos>) {
    return await this.TModel.create(data);
  }

  async update(
    id: string,
    updateDto: UpdateCourseCategoryDto,
  ): Promise<LessonVideos | null> {
    return await this.TModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    }).exec();
  }

  async delete(id: string) {
    return await this.TModel.findByIdAndDelete(id);
  }
}
