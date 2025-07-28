import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserCourseDto {
  user_id: Types.ObjectId;

  @IsNotEmpty({ message: 'không được trống' })
  course_id: Types.ObjectId;

  @IsNumber({}, { message: 'phải là số' })
  @IsNotEmpty({ message: 'không được trống' })
  progress: number;
}
