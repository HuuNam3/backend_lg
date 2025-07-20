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
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { CourseCategoriesService } from './course-categories.service';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { Types } from 'mongoose';

@Controller('course-categories')
export class CourseCategoriesController {
  private readonly logger = new Logger(CourseCategoriesController.name);
  constructor(
    private readonly courseCategoriesService: CourseCategoriesService,
  ) {}

  @Get()
  findAll(@Query('includes') includes: string, @Req() req: Request) {
    console.log(req.user);
    return this.courseCategoriesService.findAll(includes);
  }

  @Get('/:id')
  async find(@Param('id') id: string, @Query('includes') includes: string) {
    this.logger.error('findOne');
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('Không tìm thấy ID', HttpStatus.NOT_FOUND);
    }
    const res = await this.courseCategoriesService.find(id, includes);
    if (!res) {
      throw new HttpException('không tìm thấy id', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseCategoryDto) {
    return this.courseCategoriesService.create(createCourseDto);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateCourseCategoryDto: UpdateCourseCategoryDto,
  ) {
    return this.courseCategoriesService.update(id, updateCourseCategoryDto);
  }

  @Patch('/:id')
  patch(
    @Param('id') id: string,
    @Body() updateCourseCategoryDto: UpdateCourseCategoryDto,
  ) {
    return this.courseCategoriesService.update(id, updateCourseCategoryDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('ID không hợp lệ', HttpStatus.BAD_REQUEST);
    }
    const res = await this.courseCategoriesService.delete(id);
    if (!res) {
      throw new HttpException('không tìm thấy id', HttpStatus.NOT_FOUND);
    }
    return res;
  }
}
