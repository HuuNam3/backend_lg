import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LessonsDocument = Lessons & Document;

@Schema({
  collection: 'lessons',
  timestamps: true,
  versionKey: false,
})
export class Lessons {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const LessonsSchema = SchemaFactory.createForClass(Lessons);
