import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
import {
  UserAccounts,
  UserAccountsDocument,
} from 'src/schemas/user-accoutns.schema';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectModel(UserAccounts.name)
    private TModel: Model<UserAccountsDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findAll(includes?: string): Promise<UserAccounts[]> {
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
      return await this.TModel.aggregate(include);
    } else {
      return await this.TModel.find().exec();
    }
  }

  async findByEmailOrUsername(identifier: string) {
    return this.TModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).exec();
  }

  async findOne(id: string, includes?: string): Promise<UserAccounts | null> {
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
      const res: UserAccounts[] = await this.TModel.aggregate(include);
      return res[0] || null;
    } else {
      return await this.TModel.findById(id).exec();
    }
  }

  async create(course: Partial<UserAccounts>) {
    return await this.TModel.create(course);
  }

  async update(
    id: string,
    updateCourseCategoryDto: UpdateCourseCategoryDto,
  ): Promise<UserAccounts | null> {
    return await this.TModel.findByIdAndUpdate(id, updateCourseCategoryDto, {
      new: true,
    }).exec();
  }

  async delete(id: string) {
    return await this.TModel.findByIdAndDelete(id);
  }
}
