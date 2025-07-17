import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { CourseCategoriesService } from './course-categories.service';
import { CreateCourseDto } from '../courses/dto/create-course.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
@Controller('course_categories')
export class CourseCategoriesController {
  constructor(
    private readonly courseCategoriesService: CourseCategoriesService,
  ) {}

  @Get()
  findAll() {
    return this.courseCategoriesService.findAll();
  }

  @Get('/:id')
  find(@Param('id') id: string) {
    return this.courseCategoriesService.find(id);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
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
  delete(@Param('id') id: string) {
    return this.courseCategoriesService.delete(id);
  }
}
