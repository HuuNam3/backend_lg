import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserCourseDto {
  user_id: Types.ObjectId;

  @IsString({ message: 'phải là chuỗi' })
  @IsNotEmpty({ message: 'không được trống' })
  course_id: string;

  @IsNumber({}, { message: 'phải là chuỗi' })
  @IsNotEmpty({ message: 'không được trống' })
  progress: string;
}
