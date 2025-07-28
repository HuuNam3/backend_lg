import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLessonVideosDto {
  @IsNotEmpty({ message: 'title không được trống' })
  lesson_id: Types.ObjectId;

  @IsNotEmpty({ message: 'title không được trống' })
  subtitle: string;

  @IsNotEmpty({ message: 'title không được trống' })
  url: string;

  @IsNotEmpty({ message: 'title không được trống' })
  title: string;

  @IsNotEmpty({ message: 'title không được trống' })
  durations: number;
}
