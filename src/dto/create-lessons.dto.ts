import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLessonsDto {
  @IsNotEmpty({ message: 'title không được trống' })
  name: string;

  @IsNotEmpty({ message: 'title không được trống' })
  order: number;

  @IsNotEmpty({ message: 'title không được trống' })
  course_id: Types.ObjectId;
}
