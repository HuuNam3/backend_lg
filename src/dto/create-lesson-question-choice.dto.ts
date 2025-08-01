import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLessonQuestionChoiceDto {
  @IsNotEmpty({ message: 'title không được trống' })
  lesson_id: Types.ObjectId;

  @IsNotEmpty({ message: 'title không được trống' })
  options: string[];

  @IsNotEmpty({ message: 'title không được trống' })
  question: string;

  @IsNotEmpty({ message: 'title không được trống' })
  correct_answer: string;
}
