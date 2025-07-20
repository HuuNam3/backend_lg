import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserAccountsDocument = UserAccounts & Document;

@Schema({
  collection: 'user_accounts',
  timestamps: true,
  versionKey: false,
})
export class UserAccounts {
  @Prop({ required: true })
  username: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  bio: string;

  @Prop()
  image: string;

  @Prop()
  role: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserAccountsSchema = SchemaFactory.createForClass(UserAccounts);
