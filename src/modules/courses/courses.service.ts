import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Courses, CoursesDocument } from '../../schemas/courses.schema';
import { UpdateCourseCategoryDto } from '../../dto/update-course-category.dto';
import { checkCollections, includeHandle } from 'src/lib/include-handle';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Courses.name)
    private TModel: Model<CoursesDocument>,
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
      const res: Courses[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async findId(slug: string): Promise<any> {
    const course = await this.TModel.findOne({ slug: slug }).exec();
    if (!course) {
      return undefined;
    }
    return course._id;
  }

  async findOne(id: string, includes?: string): Promise<any> {
    if (!checkCollections(includes)) {
      return await this.TModel.findById(id).exec();
    }
    const include = includeHandle(includes, id);
    if (include) {
      const res: Courses[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async create(data: Partial<Courses>) {
    return await this.TModel.create(data);
  }

  async update(
    id: string,
    updateDto: UpdateCourseCategoryDto,
  ): Promise<Courses | null> {
    return await this.TModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    }).exec();
  }

  async delete(id: string) {
    return await this.TModel.findByIdAndDelete(id);
  }
}
