import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserLessonProgressDocument = UserLessonProgress & Document;

@Schema({
  collection: 'user_lesson_progress',
  timestamps: true,
  versionKey: false,
})
export class UserLessonProgress {
  @Prop()
  user_id: Types.ObjectId;

  @Prop()
  lesson_id: Types.ObjectId;

  @Prop()
  course_id: Types.ObjectId;

  @Prop()
  status: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserLessonProgressSchema =
  SchemaFactory.createForClass(UserLessonProgress);
