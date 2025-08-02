import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LessonQuestionFinalDocument = LessonQuestionFinal & Document;

@Schema({
  collection: 'lesson_question_final',
  timestamps: true,
  versionKey: false,
})
export class LessonQuestionFinal {
  @Prop()
  lesson_id: Types.ObjectId;

  @Prop()
  vietnamese: string;

  @Prop()
  target: string;

  @Prop()
  pronunciation: string;

  @Prop()
  phonetic: string;

  @Prop()
  example: string;

  @Prop()
  difficulty: string;

  @Prop()
  category: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const LessonQuestionFinalSchema =
  SchemaFactory.createForClass(LessonQuestionFinal);
