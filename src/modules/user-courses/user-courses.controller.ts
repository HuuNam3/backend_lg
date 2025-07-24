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
  Req,
} from '@nestjs/common';
import { UserCoursesService } from './user-courses.service';
import { UpdateCourseCategoryDto } from '../../dto/update-course-category.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateUserCourseDto } from 'src/dto/create-user-course.dto';

@Controller('user-courses')
@UseGuards(JwtAuthGuard) // đăng nhập mới cho sử dụng controler
export class UserCoursesController {
  private readonly logger = new Logger(UserCoursesController.name);
  constructor(private readonly TService: UserCoursesService) {}

  @Get()
  findAll(@Query('includes') includes: string) {
    return this.TService.findAll(includes);
  }

  @Get('my-courses')
  async MyCourses(@Req() req: any) {
    return await this.TService.getMyCourses(req?.user?._id);
  }

  @Get('list-my-courses')
  async ListMyCourses(@Req() req: any) {
    console.log(req?.user?._id);
    return await this.TService.getListMyCourses(req?.user?._id);
  }

  @Get(':courseId/check')
  async checkRegistration(
    @Param('courseId') courseId: string,
    @Req() req: any,
  ) {
    if (!Types.ObjectId.isValid(courseId)) {
      this.logger.error('couresID/check');
      throw new HttpException('ID không hợp lệ', HttpStatus.BAD_REQUEST);
    }
    const isRegistered = await this.TService.isUserRegistered(
      courseId,
      req?.user?._id,
    );
    return { isRegistered };
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
  create(@Body() createDto: CreateUserCourseDto, @Req() req: any) {
    createDto.user_id = req.user._id;
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
