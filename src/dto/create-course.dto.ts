import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'title không được trống' })
  instructor: string;

  @IsNotEmpty({ message: 'title không được trống' })
  duration: number;

  @IsNotEmpty({ message: 'title không được trống' })
  level: string;

  @IsNotEmpty({ message: 'title không được trống' })
  slug: string;

  @IsNotEmpty({ message: 'title không được trống' })
  order: number;

  @IsNotEmpty({ message: 'title không được trống' })
  name: string;

  @IsNotEmpty({ message: 'title không được trống' })
  thumbnail: string;

  @IsNotEmpty({ message: 'title không được trống' })
  course_categories_id: Types.ObjectId;

  @IsNotEmpty({ message: 'title không được trống' })
  language: string;
}
