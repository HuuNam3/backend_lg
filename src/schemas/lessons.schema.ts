import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LessonsDocument = Lessons & Document;

@Schema({
  collection: 'lessons',
  timestamps: true,
  versionKey: false,
})
export class Lessons {
  @Prop()
  name: string;

  @Prop()
  order: number;

  @Prop()
  course_id: Types.ObjectId;

  @Prop()
  contain: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const LessonsSchema = SchemaFactory.createForClass(Lessons);
