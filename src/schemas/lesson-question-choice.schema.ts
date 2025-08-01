import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LessonQuestionChoiceDocument = LessonQuestionChoice & Document;

@Schema({
  collection: 'lesson_question_choice',
  timestamps: true,
  versionKey: false,
})
export class LessonQuestionChoice {
  @Prop()
  lesson_id: Types.ObjectId;

  @Prop()
  options: string[];

  @Prop()
  question: string;

  @Prop()
  correct_answer: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const LessonQuestionChoiceSchema =
  SchemaFactory.createForClass(LessonQuestionChoice);
