import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UpdateUserAccountsDto } from '../../dto/update-user-accounts.dto';
import {
  UserAccounts,
  UserAccountsDocument,
} from 'src/schemas/user-accounts.schema';
import { checkCollections, includeHandle } from 'src/lib/include-handle';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectModel(UserAccounts.name)
    private TModel: Model<UserAccountsDocument>,
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

  async findByEmailOrUsername(identifier: string) {
    return this.TModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).exec();
    // .select('-password')
  }
  async findByEmailOrUsernameNoPass(identifier: string) {
    return this.TModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    })
      .select('-password')
      .exec();
  }

  async findOne(id: string, includes?: string): Promise<any> {
    if (!checkCollections(includes)) {
      return await this.TModel.findById(id).exec();
    }
    const include = includeHandle(includes, id);
    if (include) {
      const res: UserAccounts[] = await this.TModel.aggregate(include);
      return res[0] || null;
    }
  }

  async create(course: Partial<UserAccounts>) {
    return await this.TModel.create(course);
  }

  async update(
    id: string,
    updateDto: UpdateUserAccountsDto,
  ): Promise<UserAccounts | null> {
    return await this.TModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    }).exec();
  }

  async delete(id: string) {
    return await this.TModel.findByIdAndDelete(id);
  }
}
