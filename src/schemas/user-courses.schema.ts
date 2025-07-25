import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserCoursesDocument = UserCourses & Document;

@Schema({
  collection: 'user_courses',
  timestamps: true,
  versionKey: false,
})
export class UserCourses {
  @Prop({ type: Types.ObjectId, ref: 'user_accounts', required: true })
  user_id: Types.ObjectId;

  @Prop()
  course_id: string;

  @Prop()
  progress: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserCoursesSchema = SchemaFactory.createForClass(UserCourses);
