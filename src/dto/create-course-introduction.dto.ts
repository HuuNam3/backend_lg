import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCourseIntroductionDto {
  @IsNotEmpty({ message: 'title không được trống' })
  prerequisites: string;

  @IsNotEmpty({ message: 'title không được trống' })
  description: string;

  @IsNotEmpty({ message: 'title không được trống' })
  course_id: Types.ObjectId;

  @IsNotEmpty({ message: 'title không được trống' })
  you_learn: string[];
}
