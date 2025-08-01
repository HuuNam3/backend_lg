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
import { LessonQuestionChoiceService } from './lesson-question-choice.service';
import { UpdateCourseCategoryDto } from '../../dto/update-course-category.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateLessonQuestionChoiceDto } from 'src/dto/create-lesson-question-choice.dto';

@Controller('lesson-question-choice')
@UseGuards(JwtAuthGuard) // đăng nhập mới cho sử dụng controler
export class LessonQuestionChoiceController {
  private readonly logger = new Logger(LessonQuestionChoiceController.name);
  constructor(private readonly TService: LessonQuestionChoiceService) {}

  @Get()
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
      throw new HttpException('không tìm thấy ID', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Get(':lessonId/lessonId')
  async findLessonId(@Param('lessonId') lessonId: string) {
    const res = await this.TService.findLessonId(lessonId);
    if (!res) {
      this.logger.error('findOne');
      throw new HttpException('không tìm thấy ID', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Post()
  create(@Body() createDto: CreateLessonQuestionChoiceDto) {
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
