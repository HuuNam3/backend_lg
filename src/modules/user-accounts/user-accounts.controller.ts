import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  Query,
  HttpException,
  HttpStatus,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserAccountsDto } from '../../dto/update-user-accounts.dto';
import { CreateUserAccountsDto } from '../../dto/create-user-accounts.dto';
import { Types } from 'mongoose';
import { UserAccountsService } from './user-accounts.service';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('user-accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserAccountsController {
  private readonly logger = new Logger(UserAccountsController.name);
  constructor(private readonly TService: UserAccountsService) {}

  @Get()
  @Roles(['admin'])
  findAll(@Query('includes') includes: string) {
    return this.TService.findAll(includes);
  }

  @Get('/:id')
  async find(@Param('id') id: string, @Query('includes') includes: string) {
    if (!Types.ObjectId.isValid(id)) {
      this.logger.error('findOne');
      throw new HttpException('ID không hợp lệ', HttpStatus.BAD_REQUEST);
    }
    const res = await this.TService.findOne(id, includes);
    if (!res) {
      this.logger.error('findOne');
      throw new HttpException('không tìm thấy id', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Post()
  create(@Body() createDto: CreateUserAccountsDto) {
    return this.TService.create(createDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateDto: UpdateUserAccountsDto) {
    return this.TService.update(id, updateDto);
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateDto: UpdateUserAccountsDto) {
    return this.TService.update(id, updateDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      this.logger.error('Delete');
      throw new HttpException('ID không hợp lệ', HttpStatus.BAD_REQUEST);
    }
    const res = await this.TService.delete(id);
    if (!res) {
      this.logger.error('Delete');
      throw new HttpException('không tìm thấy id', HttpStatus.NOT_FOUND);
    }
    return res;
  }
}
