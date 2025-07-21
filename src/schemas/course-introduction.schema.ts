import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseIntroductionDocument = CourseIntroduction & Document;

@Schema({
  collection: 'course_introduction',
  timestamps: true,
  versionKey: false,
})
export class CourseIntroduction {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CourseIntroductionSchema =
  SchemaFactory.createForClass(CourseIntroduction);
