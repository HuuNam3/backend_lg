import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserAccountsDocument = UserAccounts & Document;

@Schema({ collection: 'user_accounts' })
export class UserAccounts {
  @Prop({ required: true })
  name: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserAccountsSchema = SchemaFactory.createForClass(UserAccounts);
