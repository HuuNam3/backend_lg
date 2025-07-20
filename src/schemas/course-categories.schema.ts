import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseCategoriesDocument = CourseCategories & Document;

@Schema({
  collection: 'course_categories',
  timestamps: true,
  versionKey: false,
})
export class CourseCategories {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CourseCategoriesSchema =
  SchemaFactory.createForClass(CourseCategories);
