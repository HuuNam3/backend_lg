import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAccountDto } from './create-user-account.dto';

export class UpdateUserAccountDto extends PartialType(CreateUserAccountDto) {}
