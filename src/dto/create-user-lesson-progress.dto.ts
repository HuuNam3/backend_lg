import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserLessonProgressDto {
  @IsNotEmpty({ message: 'không được trống' })
  user_id: Types.ObjectId;

  @IsNotEmpty({ message: 'không được trống' })
  course_id: Types.ObjectId;

  @IsNotEmpty({ message: 'không được trống' })
  lesson_id: Types.ObjectId;

  @IsNotEmpty({ message: 'không được trống' })
  status: string;
}
