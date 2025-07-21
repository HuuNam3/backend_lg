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
import { CourseIntroductionService } from './course-introduction.service';
import { UpdateCourseCategoryDto } from '../../dto/update-course-category.dto';
import { CreateCourseCategoryDto } from '../../dto/create-course-category.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('course-introduction')
@UseGuards(JwtAuthGuard) // đăng nhập mới cho sử dụng controler
export class CourseIntroductionController {
  private readonly logger = new Logger(CourseIntroductionController.name);
  constructor(private readonly TService: CourseIntroductionService) {}

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

  @Post()
  create(@Body() createDto: CreateCourseCategoryDto) {
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
