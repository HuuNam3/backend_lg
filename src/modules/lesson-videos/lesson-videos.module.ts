import { Module } from '@nestjs/common';
import { LessonVideosService } from './lesson-videos.service';
import { LessonVideosController } from './lesson-videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LessonVideos,
  LessonVideosSchema,
} from '../../schemas/lesson-videos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LessonVideos.name, schema: LessonVideosSchema },
    ]),
  ],
  controllers: [LessonVideosController],
  providers: [LessonVideosService],
})
export class LessonVideosModule {}
