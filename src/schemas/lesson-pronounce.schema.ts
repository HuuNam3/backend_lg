import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LessonPronounceDocument = LessonPronounce & Document;

@Schema({
  collection: 'lesson_pronounce',
  timestamps: true,
  versionKey: false,
})
export class LessonPronounce {
  @Prop()
  lesson_id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  translation: string;

  @Prop()
  text: string;

  @Prop()
  description: string;

  @Prop()
  example: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const LessonPronounceSchema =
  SchemaFactory.createForClass(LessonPronounce);
