import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CoursesDocument = Courses & Document;

@Schema({
  collection: 'courses',
  timestamps: true,
  versionKey: false,
})
export class Courses {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CoursesSchema = SchemaFactory.createForClass(Courses);
