import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { Lessons, LessonsDocument } from '../../schemas/lessons.schema';
import { UpdateCourseCategoryDto } from '../../dto/update-course-category.dto';
import { checkCollections, includeHandle } from 'src/lib/include-handle';
import { UserLessonProgressService } from '../user-lesson-progress/user-lesson-progress.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lessons.name)
    private TModel: Model<LessonsDocument>,
    private readonly TService: UserLessonProgressService,
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

  async findSlug(slug: string, includes?: string): Promise<any> {
    if (!checkCollections(includes)) {
      return await this.TModel.findOne({ slug: slug }).exec();
    }
    const include = includeHandle(includes, undefined, slug);
    if (include) {
      const res: Lessons[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async findOne(id: string, includes?: string): Promise<any> {
    if (!checkCollections(includes)) {
      return await this.TModel.findById(id).exec();
    }
    const include = includeHandle(includes, id);
    if (include) {
      const res: Lessons[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async getLessonDetail(coursesId: string): Promise<object> {
    const lessonFull = await this.TModel.findOne({
      course_id: new Types.ObjectId(coursesId),
    });

    const totalLesson = await this.TModel.countDocuments({
      course_id: new Types.ObjectId(coursesId),
    });

    const completeLesson = await this.TService.getLessonComplete(coursesId);

    return {
      lessonFull,
      totalLesson,
      completeLesson,
    };
  }

  async create(data: Partial<Lessons>) {
    return await this.TModel.create(data);
  }

  async update(
    id: string,
    updateDto: UpdateCourseCategoryDto,
  ): Promise<Lessons | null> {
    return await this.TModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    }).exec();
  }

  async delete(id: string) {
    return await this.TModel.findByIdAndDelete(id);
  }
}
