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
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
import { CreateUserAccountsDto } from './dto/create-user-accounts.dto';
import { Types } from 'mongoose';
import { UserAccountsService } from './user-accounts.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('user-accounts')
@UseGuards(JwtAuthGuard)
export class UserAccountsController {
  constructor(private readonly TService: UserAccountsService) {}

  @Get()
  findAll(@Query('includes') includes: string, @Req() req: Request) {
    return this.TService.findAll(includes);
  }

  @Get('/:id')
  async find(@Param('id') id: string, @Query('includes') includes: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('ID không hợp lệ', HttpStatus.BAD_REQUEST);
    }
    const res = await this.TService.findOne(id, includes);
    if (!res) {
      throw new HttpException('không tìm thấy id', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Post()
  create(@Body() createDto: CreateUserAccountsDto) {
    return this.TService.create(createDto);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateCourseCategoryDto: UpdateCourseCategoryDto,
  ) {
    return this.TService.update(id, updateCourseCategoryDto);
  }

  @Patch('/:id')
  patch(
    @Param('id') id: string,
    @Body() updateCourseCategoryDto: UpdateCourseCategoryDto,
  ) {
    return this.TService.update(id, updateCourseCategoryDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('ID không hợp lệ', HttpStatus.BAD_REQUEST);
    }
    const res = await this.TService.delete(id);
    if (!res) {
      throw new HttpException('không tìm thấy id', HttpStatus.NOT_FOUND);
    }
    return res;
  }
}
