import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserCourseDto {
  user_id: string;

  @IsString({ message: 'phải là chuỗi' })
  @IsNotEmpty({ message: 'không được trống' })
  course_id: string;

  @IsNumber({}, { message: 'phải là chuỗi' })
  @IsNotEmpty({ message: 'không được trống' })
  progress: string;
}
