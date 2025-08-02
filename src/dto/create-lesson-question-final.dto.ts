import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLessonQuestionFinalDto {
  @IsNotEmpty({ message: 'title không được trống' })
  lesson_id: Types.ObjectId;

  @IsNotEmpty({ message: 'title không được trống' })
  vietnamese: string;

  @IsNotEmpty({ message: 'title không được trống' })
  target: string;

  @IsNotEmpty({ message: 'title không được trống' })
  pronunciation: string;

  @IsNotEmpty({ message: 'title không được trống' })
  phonetic: string;

  @IsNotEmpty({ message: 'title không được trống' })
  example: string;

  @IsNotEmpty({ message: 'title không được trống' })
  difficulty: string;

  @IsNotEmpty({ message: 'title không được trống' })
  category: string;
}
