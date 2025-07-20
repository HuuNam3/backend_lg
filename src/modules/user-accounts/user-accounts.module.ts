import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserAccounts,
  UserAccountsSchema,
} from 'src/schemas/user-accoutns.schema';
import { UserAccountsController } from './user-accounts.controller';
import { UserAccountsService } from './user-accounts.service';
import { JwtStrategy } from 'src/passport/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAccounts.name, schema: UserAccountsSchema },
    ]),
  ],
  controllers: [UserAccountsController],
  providers: [UserAccountsService, JwtStrategy],
  exports: [UserAccountsService],
})
export class UserAccountsModule {}
