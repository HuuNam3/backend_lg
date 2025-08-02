import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLessonPronounceDto {
  @IsNotEmpty({ message: 'title không được trống' })
  lesson_id: Types.ObjectId;

  @IsNotEmpty({ message: 'title không được trống' })
  title: string;

  @IsNotEmpty({ message: 'title không được trống' })
  translation: string;

  @IsNotEmpty({ message: 'title không được trống' })
  text: string;

  @IsNotEmpty({ message: 'title không được trống' })
  description: string;

  @IsNotEmpty({ message: 'title không được trống' })
  example: string;
}
