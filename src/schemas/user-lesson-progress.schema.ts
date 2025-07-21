import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserLessonProgressDocument = UserLessonProgress & Document;

@Schema({
  collection: 'user_lesson_progress',
  timestamps: true,
  versionKey: false,
})
export class UserLessonProgress {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserLessonProgressSchema =
  SchemaFactory.createForClass(UserLessonProgress);
