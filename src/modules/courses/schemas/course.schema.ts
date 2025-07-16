import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ collection: 'courses' })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop()
  instructor: string;

  @Prop()
  duration: number;

  @Prop()
  level: string;

  @Prop()
  slug: string;

  @Prop()
  order: string;

  @Prop()
  thumbnail: string;

  @Prop({ type: Types.ObjectId })
  course_categories_id: Types.ObjectId;

  @Prop()
  course_categories_name: string;

  @Prop()
  language: string;

  @Prop()
  studied: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
