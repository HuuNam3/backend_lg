import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import {
  UserAccounts,
  UserAccountsDocument,
} from './schemas/user-accounts.schema';
@Injectable()
export class UserAccountsService {
  constructor(
    @InjectModel(UserAccounts.name)
    private courseModel: Model<UserAccountsDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  findAll(): Promise<UserAccounts[]> {
    return this.courseModel.find().exec();
  }

  create(course: Partial<UserAccounts>) {
    return this.courseModel.create(course);
  }
}
