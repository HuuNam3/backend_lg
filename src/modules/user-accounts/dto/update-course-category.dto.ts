import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAccountsDto } from './create-user-accounts.dto';

export class UpdateCourseCategoryDto extends PartialType(
  CreateUserAccountsDto,
) {}
