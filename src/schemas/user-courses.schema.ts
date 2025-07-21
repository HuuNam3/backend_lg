import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCoursesDocument = UserCourses & Document;

@Schema({
  collection: 'user_courses',
  timestamps: true,
  versionKey: false,
})
export class UserCourses {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserCoursesSchema = SchemaFactory.createForClass(UserCourses);
