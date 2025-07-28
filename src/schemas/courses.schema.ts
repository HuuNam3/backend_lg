import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CoursesDocument = Courses & Document;

@Schema({
  collection: 'courses',
  timestamps: true,
  versionKey: false,
})
export class Courses {
  @Prop()
  instructor: string;

  @Prop()
  duration: number;

  @Prop()
  level: string;

  @Prop()
  slug: string;

  @Prop()
  order: number;

  @Prop()
  name: string;

  @Prop()
  thumbnail: string;

  @Prop()
  course_categories_id: Types.ObjectId;

  @Prop()
  language: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CoursesSchema = SchemaFactory.createForClass(Courses);
