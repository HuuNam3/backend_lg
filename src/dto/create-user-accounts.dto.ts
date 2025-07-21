import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserAccountsDto {
  @IsString({ message: 'title phải là chuỗi' })
  @IsNotEmpty({ message: 'title không được trống' })
  name: string;

  @IsString({ message: 'title phải là chuỗi' })
  username: string;

  @IsString({ message: 'title phải là chuỗi' })
  @IsNotEmpty({ message: 'title không được trống' })
  password: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsString({ message: 'title phải là chuỗi' })
  @IsNotEmpty({ message: 'title không được trống' })
  // @IsEmailUnique({ message: 'Email đã tồn tại' })
  email: string;

  @IsString({ message: 'title phải là chuỗi' })
  @IsNotEmpty({ message: 'title không được trống' })
  bio: string;

  @IsString({ message: 'title phải là chuỗi' })
  @IsNotEmpty({ message: 'title không được trống' })
  image: string;

  @IsString({ message: 'title phải là chuỗi' })
  @IsNotEmpty({ message: 'title không được trống' })
  role: string;

  @IsString({ message: 'description phải là chuỗi' })
  description?: string;
}
