import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCourseCategoryDto {
  @IsString({ message: 'title phải là chuỗi' })
  @IsNotEmpty({ message: 'title không được trống' })
  title: string;

  @IsString({ message: 'description phải là chuỗi' })
  @IsOptional()
  description?: string;
}
