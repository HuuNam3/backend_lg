import { Module } from '@nestjs/common';
import { UserAccountsService } from './user-accounts.service';
import { UserAccountsController } from './user-accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserAccounts,
  UserAccountsSchema,
} from './schemas/user-accounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAccounts.name, schema: UserAccountsSchema },
    ]),
  ],
  controllers: [UserAccountsController],
  providers: [UserAccountsService],
})
export class UserAccountsModule {}
