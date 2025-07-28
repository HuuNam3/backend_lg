import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseIntroductionDocument = CourseIntroduction & Document;

@Schema({
  collection: 'course_introduction',
  timestamps: true,
  versionKey: false,
})
export class CourseIntroduction {
  @Prop()
  prerequisites: string;

  @Prop()
  description: string;

  @Prop()
  course_id: Types.ObjectId;

  @Prop()
  you_learn: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CourseIntroductionSchema =
  SchemaFactory.createForClass(CourseIntroduction);
